// 🚀 ONE-CLICK SETUP SCRIPT
// Just run: npm run setup-inductive-study
// This will handle EVERYTHING automatically!

console.log('🎯 SCRIPTURA INDUCTIVE STUDY SETUP');
console.log('=====================================');
console.log('🔧 Setting up the new inductive study system...');
console.log('📦 This will automatically:');
console.log('   ✅ Create the new database collection');
console.log('   ✅ Migrate any existing data');
console.log('   ✅ Set up proper indexes');
console.log('   ✅ Clean up old structure');
console.log('   ✅ Verify everything works');
console.log('=====================================\n');

// Import and run the migration
import('./migrate-inductive-studies.js')
  .then(() => {
    console.log('\n🎉 SETUP COMPLETE!');
    console.log('Your inductive study system is ready to use.');
    console.log('Users can now save studies that are specific to each Bible chapter.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Setup failed:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('   - Make sure MongoDB is running');
    console.log('   - Check your .env file has MONGODB_URI');
    console.log('   - Verify database connection works');
    process.exit(1);
  });
