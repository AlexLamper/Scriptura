# Themed Courses Setup Instructions

## Overview
This document explains how to populate your MongoDB database with themed courses data that supports the new filtering system.

## Available Themes
The sample data includes courses for the following themes:
- **Faith** - Foundational teachings about biblical faith
- **Grace** - Understanding God's grace and mercy
- **Parables** - Wisdom from Jesus' stories
- **Prayer** - Developing a prayer life
- **Salvation** - The path to salvation
- **Discipleship** - Following Jesus
- **Love** - Biblical love in action
- **Wisdom** - Practical wisdom for daily living

## How to Import the Data

### Option 1: Using MongoDB Compass
1. Open MongoDB Compass
2. Connect to your database
3. Navigate to your courses collection
4. Click "Import Data"
5. Select the `themed-courses.json` file
6. Import as JSON

### Option 2: Using MongoDB Shell
```bash
# Navigate to the sample-data directory
cd sample-data

# Use mongoimport to import the data
mongoimport --db your_database_name --collection courses --file themed-courses.json --jsonArray
```

### Option 3: Using Node.js Script
Create a script to import the data programmatically:

```javascript
// import-themed-courses.js
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

async function importCourses() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection('courses');
    
    // Read the JSON file
    const coursesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'themed-courses.json'), 'utf8')
    );
    
    // Clear existing courses (optional)
    // await collection.deleteMany({});
    
    // Insert new themed courses
    const result = await collection.insertMany(coursesData);
    console.log(`${result.insertedCount} courses imported successfully`);
    
  } catch (error) {
    console.error('Error importing courses:', error);
  } finally {
    await client.close();
  }
}

importCourses();
```

### Option 4: Manual Entry
You can copy individual course objects from `themed-courses.json` and add them manually through your application's admin interface or database tool.

## Verifying the Import

After importing, verify the data by:

1. **Check Course Count**: Ensure 8 courses were imported
2. **Verify Themes**: Check that each course has a `theme` field
3. **Test Filtering**: Visit `/courses` page and test the theme filter dropdown
4. **Check Passages**: Ensure each course has relevant biblical passages

## Course Structure

Each course includes:
- `title` - Course name
- `description` - Brief description
- `category` - Course category
- `theme` - Main theme (for filtering)
- `difficulty` - beginner/intermediate/advanced
- `language` - Course language
- `totalDuration` - Duration in minutes
- `tags` - Array of tags
- `learning_objectives` - Array of learning goals
- `passages` - Array of Bible passages with book/chapter/verses
- `content` - Course content
- `imageUrl` - Course image path
- `isPremium` - Whether course requires premium access

## Customization

Feel free to modify the sample data to:
- Add more courses for existing themes
- Create new themes
- Adjust difficulty levels
- Update passages and content
- Change premium status

## Next Steps

After importing the data:
1. Test the theme filtering on the courses page
2. Verify course display and theme badges
3. Add actual course content and images
4. Set up proper image assets in the `/public/images/` directory
