import connectMongoDB from '../libs/mongodb.js';
import BiblePlan from '../models/BiblePlan.js';
import User from '../models/User.js';

const samplePlans = [
  {
    title: "30 Dagen door het Evangelie van Johannes",
    description: "Een reis door het leven van Jezus zoals beschreven door Johannes",
    category: "evangelie",
    isPublic: true,
    duration: 30,
    readings: [
      { day: 1, reference: "Johannes 1:1-18", title: "Het Woord werd vlees" },
      { day: 2, reference: "Johannes 1:19-34", title: "Johannes de Doper getuigt" },
      { day: 3, reference: "Johannes 1:35-51", title: "De eerste discipelen" },
      { day: 4, reference: "Johannes 2:1-12", title: "Water wordt wijn" },
      { day: 5, reference: "Johannes 2:13-25", title: "Reiniging van de tempel" },
      { day: 6, reference: "Johannes 3:1-21", title: "Nicodemus bezoekt Jezus" },
      { day: 7, reference: "Johannes 3:22-36", title: "Jezus en Johannes de Doper" },
      { day: 8, reference: "Johannes 4:1-26", title: "De vrouw bij de put" },
      { day: 9, reference: "Johannes 4:27-42", title: "Geloof van de Samaritanen" },
      { day: 10, reference: "Johannes 4:43-54", title: "Genezing van de zoon" },
      { day: 11, reference: "Johannes 5:1-18", title: "Genezing bij de vijver" },
      { day: 12, reference: "Johannes 5:19-30", title: "De autoriteit van de Zoon" },
      { day: 13, reference: "Johannes 5:31-47", title: "Getuigenissen over Jezus" },
      { day: 14, reference: "Johannes 6:1-15", title: "Voeding van de vijfduizend" },
      { day: 15, reference: "Johannes 6:16-24", title: "Jezus loopt op water" }
    ]
  },
  {
    title: "Psalmen van Troost - 14 Dagen",
    description: "Vind troost en vrede in Gods woord door bekende psalmen",
    category: "psalmen",
    isPublic: true,
    duration: 14,
    readings: [
      { day: 1, reference: "Psalm 23", title: "De Heer is mijn herder" },
      { day: 2, reference: "Psalm 46", title: "God is onze toevlucht" },
      { day: 3, reference: "Psalm 91", title: "Bescherming van de Allerhoogste" },
      { day: 4, reference: "Psalm 121", title: "Hulp komt van de Heer" },
      { day: 5, reference: "Psalm 139", title: "God kent mij volkomen" },
      { day: 6, reference: "Psalm 27", title: "De Heer is mijn licht" },
      { day: 7, reference: "Psalm 62", title: "Stilte voor God" },
      { day: 8, reference: "Psalm 103", title: "Loof de Heer, mijn ziel" },
      { day: 9, reference: "Psalm 34", title: "Ik zal de Heer altijd loven" },
      { day: 10, reference: "Psalm 40", title: "Geduldig gewacht op de Heer" },
      { day: 11, reference: "Psalm 86", title: "Gebed in nood" },
      { day: 12, reference: "Psalm 118", title: "Zijn liefde houdt eeuwig stand" },
      { day: 13, reference: "Psalm 130", title: "Uit de diepten roep ik" },
      { day: 14, reference: "Psalm 145", title: "Lofzang op Gods grootheid" }
    ]
  },
  {
    title: "Spreuken voor Wijsheid - 21 Dagen",
    description: "Dagelijkse wijsheid uit het boek Spreuken voor praktisch leven",
    category: "proverbs",
    isPublic: true,
    duration: 21,
    readings: [
      { day: 1, reference: "Spreuken 1:1-19", title: "Het doel van Spreuken" },
      { day: 2, reference: "Spreuken 1:20-33", title: "Wijsheid roept uit" },
      { day: 3, reference: "Spreuken 2:1-22", title: "Voordelen van wijsheid" },
      { day: 4, reference: "Spreuken 3:1-12", title: "Vertrouw op de Heer" },
      { day: 5, reference: "Spreuken 3:13-35", title: "Wijsheid is kostbaar" },
      { day: 6, reference: "Spreuken 4:1-19", title: "Wijsheid van vader op zoon" },
      { day: 7, reference: "Spreuken 4:20-27", title: "Waakt over je hart" },
      { day: 8, reference: "Spreuken 5:1-23", title: "Waarschuwing tegen overspel" },
      { day: 9, reference: "Spreuken 6:1-19", title: "Waarschuwingen en zeven gruwelen" },
      { day: 10, reference: "Spreuken 6:20-35", title: "Waarschuwing tegen ontucht" },
      { day: 11, reference: "Spreuken 7:1-27", title: "De verleidelijke vrouw" },
      { day: 12, reference: "Spreuken 8:1-21", title: "Wijsheid roept" },
      { day: 13, reference: "Spreuken 8:22-36", title: "Wijsheid bij de schepping" },
      { day: 14, reference: "Spreuken 9:1-18", title: "Wijsheid vs. dwaasheid" },
      { day: 15, reference: "Spreuken 10:1-16", title: "Spreuken van Salomo" },
      { day: 16, reference: "Spreuken 11:1-15", title: "Eerlijkheid en rechtschapenheid" },
      { day: 17, reference: "Spreuken 12:1-14", title: "Wijze en dwaze woorden" },
      { day: 18, reference: "Spreuken 13:1-13", title: "Wijsheid en discipline" },
      { day: 19, reference: "Spreuken 14:1-18", title: "Wijsheid bouwt op" },
      { day: 20, reference: "Spreuken 15:1-17", title: "Een zacht antwoord" },
      { day: 21, reference: "Spreuken 16:1-15", title: "De Heer weegt de harten" }
    ]
  }
];

async function seedBiblePlans() {
  try {
    // Connect to MongoDB using existing function
    await connectMongoDB();
    console.log('Connected to MongoDB');

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

    console.log('Admin user:', adminUser.email);

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

    // List all plans to verify
    const allPlans = await BiblePlan.find({}).populate('createdBy', 'name');
    console.log('\nCreated plans:');
    allPlans.forEach(plan => {
      console.log(`- ${plan.title} (${plan.category}, ${plan.readings.length} readings, public: ${plan.isPublic})`);
    });

    console.log('\nSeeding completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedBiblePlans();
