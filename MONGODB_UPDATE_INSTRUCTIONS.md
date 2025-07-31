# MongoDB Data Update Instructions

The issue is that your imported course data is missing the `language` field that the frontend expects for filtering.

## Steps to Fix:

1. **Delete existing course data:**
   ```javascript
   db.courses.deleteMany({})
   ```

2. **Import the updated data with language field:**
   - Use MongoDB Compass
   - Select your database
   - Go to the "courses" collection  
   - Click "Import Data"
   - Select the updated `sample-data/courses.json` file
   - Import as JSON

## What was fixed:

The sample data now includes a `language: "en"` field for each course, which matches what the frontend filtering expects.

## Alternative Terminal Command:

If you prefer using the terminal in your project directory:

```bash
mongoimport --db scriptura --collection courses --file sample-data/courses.json --jsonArray --drop
```

The `--drop` flag will replace existing data.

## Debug Output:

After the import, refresh your courses page. You should see debug output in the browser console showing:
- API Response with course data
- Current Language detection  
- Course filtering results
- Whether courses match the language filter

This will help verify the data is imported correctly and the filtering is working.
