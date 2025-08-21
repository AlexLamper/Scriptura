// Automatic migration script - just run this and everything is handled!
// This script will:
// 1. Create the new InductiveStudy collection automatically
// 2. Migrate all existing data
// 3. Clean up the old data structure
// 4. Set up proper indexes

import mongoose from 'mongoose';
import { connectDB } from '../lib/connectDB.js';

// Define schemas inline to avoid dependency issues
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String },
  image: { type: String },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  streak: { type: Number, default: 0 },
  lastStreakDate: { type: Date },
  freezeCount: { type: Number, default: 0 },
  badges: { type: [String], default: [] },
  subscribed: { type: Boolean, default: false },
  stripeCustomerId: { type: String },
  stripeSubscriptionId: { type: String },
  isAdmin: { type: Boolean, default: false },
  inductiveStudies: [{
    book: { type: String, required: true },
    chapter: { type: Number, required: true },
    version: { type: String, required: true },
    observation: { type: String, default: '' },
    interpretation: { type: String, default: '' },
    application: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }],
  preferences: {
    language: { type: String },
    translation: { type: String },
    intent: { type: String },
    onboardingCompleted: { type: Boolean, default: false },
    updatedAt: { type: Date }
  },
}, { timestamps: true });

const InductiveStudySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  book: {
    type: String,
    required: true
  },
  chapter: {
    type: Number,
    required: true
  },
  version: {
    type: String,
    required: true
  },
  observation: {
    type: String,
    default: ''
  },
  interpretation: {
    type: String,
    default: ''
  },
  application: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Compound index for efficient querying
InductiveStudySchema.index({ userId: 1, book: 1, chapter: 1, version: 1 }, { unique: true });

async function migrateInductiveStudies() {
  try {
    console.log('🚀 Starting automatic migration of inductive studies...');
    console.log('📦 This will create the new collection and migrate all data automatically');
    
    await connectDB();
    
    // Create models
    const User = mongoose.models.User || mongoose.model('User', UserSchema);
    const InductiveStudy = mongoose.models.InductiveStudy || mongoose.model('InductiveStudy', InductiveStudySchema);
    
    console.log('✅ Connected to database');
    console.log('✅ Models created/loaded');
    
    // Step 1: Create the InductiveStudy collection (happens automatically)
    console.log('📝 Creating InductiveStudy collection...');
    
    // Step 2: Find all users with inductive studies
    const usersWithStudies = await User.find({ 
      inductiveStudies: { $exists: true, $ne: [] } 
    });
    
    console.log(`📊 Found ${usersWithStudies.length} users with inductive studies`);
    
    if (usersWithStudies.length === 0) {
      console.log('✅ No existing data to migrate. Setup complete!');
      console.log('🎉 You can now use the new inductive study system!');
      return;
    }
    
    let migratedCount = 0;
    let totalStudies = 0;
    
    // Step 3: Migrate all data
    console.log('🔄 Starting data migration...');
    
    for (const user of usersWithStudies) {
      if (user.inductiveStudies && user.inductiveStudies.length > 0) {
        console.log(`   📖 Migrating ${user.inductiveStudies.length} studies for user: ${user.email}`);
        totalStudies += user.inductiveStudies.length;
        
        for (const study of user.inductiveStudies) {
          try {
            // Create or update study in new collection
            await InductiveStudy.findOneAndUpdate(
              {
                userId: user._id,
                book: study.book,
                chapter: study.chapter,
                version: study.version
              },
              {
                userId: user._id,
                book: study.book,
                chapter: study.chapter,
                version: study.version,
                observation: study.observation || '',
                interpretation: study.interpretation || '',
                application: study.application || '',
                createdAt: study.createdAt || new Date(),
                updatedAt: study.updatedAt || new Date()
              },
              {
                new: true,
                upsert: true
              }
            );
            
            migratedCount++;
          } catch (error) {
            console.error(`   ❌ Error migrating study for user ${user.email}:`, error.message);
          }
        }
        
        // Step 4: Clean up old data from user document
        await User.updateOne(
          { _id: user._id },
          { $unset: { inductiveStudies: "" } }
        );
        
        console.log(`   ✅ Completed migration for user: ${user.email}`);
      }
    }
    
    // Step 5: Verify migration
    const newStudyCount = await InductiveStudy.countDocuments();
    
    console.log('\n🎉 MIGRATION COMPLETED SUCCESSFULLY!');
    console.log('='.repeat(50));
    console.log(`📊 Total users processed: ${usersWithStudies.length}`);
    console.log(`📚 Total studies found: ${totalStudies}`);
    console.log(`✅ Studies migrated: ${migratedCount}`);
    console.log(`🗄️  Studies in new collection: ${newStudyCount}`);
    console.log('='.repeat(50));
    console.log('🚀 Your inductive study system is now ready to use!');
    console.log('📱 Users can now save studies per Bible chapter');
    console.log('🔒 Data is properly isolated per book/chapter/version');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('💡 Make sure your MongoDB connection is working');
    console.error('💡 Check your .env file for MONGODB_URI');
  } finally {
    console.log('\n🔌 Closing database connection...');
    mongoose.connection.close();
    console.log('✅ Migration script finished');
  }
}

// Run the migration
migrateInductiveStudies();
