import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/connectDB.js';
import BiblePlan from '../../../models/BiblePlan.js';
import User from '../../../models/User.js';

const samplePlans = [
  {
    title: "30 Dagen door het Evangelie van Johannes",
    description: "Een reis door het leven van Jezus zoals beschreven door Johannes",
    category: "evangelie",
    isPublic: true,
    duration: 30,
    readings: [
      { day: 1, book: "Johannes", chapter: 1, title: "Het Woord werd vlees" },
      { day: 2, book: "Johannes", chapter: 1, title: "Johannes de Doper getuigt" },
      { day: 3, book: "Johannes", chapter: 1, title: "De eerste discipelen" },
      { day: 4, book: "Johannes", chapter: 2, title: "Water wordt wijn" },
      { day: 5, book: "Johannes", chapter: 2, title: "Reiniging van de tempel" },
      { day: 6, book: "Johannes", chapter: 3, title: "Nicodemus bezoekt Jezus" },
      { day: 7, book: "Johannes", chapter: 3, title: "Jezus en Johannes de Doper" },
      { day: 8, book: "Johannes", chapter: 4, title: "De vrouw bij de put" },
      { day: 9, book: "Johannes", chapter: 4, title: "Geloof van de Samaritanen" },
      { day: 10, book: "Johannes", chapter: 4, title: "Genezing van de zoon" }
    ]
  },
  {
    title: "Psalmen van Troost - 14 Dagen",
    description: "Vind troost en vrede in Gods woord door bekende psalmen",
    category: "psalmen",
    isPublic: true,
    duration: 14,
    readings: [
      { day: 1, book: "Psalm", chapter: 23, title: "De Heer is mijn herder" },
      { day: 2, book: "Psalm", chapter: 46, title: "God is onze toevlucht" },
      { day: 3, book: "Psalm", chapter: 91, title: "Bescherming van de Allerhoogste" },
      { day: 4, book: "Psalm", chapter: 121, title: "Hulp komt van de Heer" },
      { day: 5, book: "Psalm", chapter: 139, title: "God kent mij volkomen" },
      { day: 6, book: "Psalm", chapter: 27, title: "De Heer is mijn licht" },
      { day: 7, book: "Psalm", chapter: 62, title: "Stilte voor God" },
      { day: 8, book: "Psalm", chapter: 103, title: "Loof de Heer, mijn ziel" },
      { day: 9, book: "Psalm", chapter: 34, title: "Ik zal de Heer altijd loven" },
      { day: 10, book: "Psalm", chapter: 40, title: "Geduldig gewacht op de Heer" },
      { day: 11, book: "Psalm", chapter: 86, title: "Gebed in nood" },
      { day: 12, book: "Psalm", chapter: 118, title: "Zijn liefde houdt eeuwig stand" },
      { day: 13, book: "Psalm", chapter: 130, title: "Uit de diepten roep ik" },
      { day: 14, book: "Psalm", chapter: 145, title: "Lofzang op Gods grootheid" }
    ]
  },
  {
    title: "Spreuken voor Wijsheid - 10 Dagen",
    description: "Dagelijkse wijsheid uit het boek Spreuken voor praktisch leven",
    category: "proverbs",
    isPublic: true,
    duration: 10,
    readings: [
      { day: 1, book: "Spreuken", chapter: 1, title: "Het doel van Spreuken" },
      { day: 2, book: "Spreuken", chapter: 2, title: "Voordelen van wijsheid" },
      { day: 3, book: "Spreuken", chapter: 3, title: "Vertrouw op de Heer" },
      { day: 4, book: "Spreuken", chapter: 4, title: "Wijsheid van vader op zoon" },
      { day: 5, book: "Spreuken", chapter: 6, title: "Waarschuwingen en zeven gruwelen" },
      { day: 6, book: "Spreuken", chapter: 8, title: "Wijsheid roept" },
      { day: 7, book: "Spreuken", chapter: 10, title: "Spreuken van Salomo" },
      { day: 8, book: "Spreuken", chapter: 12, title: "Wijze en dwaze woorden" },
      { day: 9, book: "Spreuken", chapter: 15, title: "Een zacht antwoord" },
      { day: 10, book: "Spreuken", chapter: 16, title: "De Heer weegt de harten" }
    ]
  }
];

export async function POST() {
  try {
    await connectDB();
    
    // Find an admin user or create one
    let adminUser = await User.findOne({ isAdmin: true });
    
    if (!adminUser) {
      // Find any user and make them admin for seeding
      adminUser = await User.findOne({});
      if (adminUser) {
        adminUser.isAdmin = true;
        await adminUser.save();
        console.log('Made existing user admin for seeding');
      } else {
        // Create a default admin user
        adminUser = await User.create({
          name: "Admin User",
          email: "admin@scriptura.nl",
          isAdmin: true,
          bio: "System Administrator"
        });
        console.log('Created admin user');
      }
    }

    // Clear existing plans
    const deleteResult = await BiblePlan.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing plans`);

    // Create new plans
    const plans = samplePlans.map(plan => ({
      ...plan,
      createdBy: adminUser._id,
      createdAt: new Date(),
      enrolledUsers: [],
      progress: []
    }));

    const result = await BiblePlan.insertMany(plans);
    console.log(`Successfully created ${result.length} Bible reading plans`);

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${result.length} Bible reading plans`,
      plans: result.map(p => ({ title: p.title, category: p.category }))
    });

  } catch (error) {
    console.error('Error seeding Bible plans:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
