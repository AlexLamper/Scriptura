# Inductive Study Migration Instructions

## Overview
The inductive study data has been moved from the User collection to a separate InductiveStudy collection for better data organization and performance.

## Database Changes

### Before
- Inductive studies were stored as an array field `inductiveStudies` in the User model
- Data was embedded within user documents

### After
- Inductive studies are now stored in a separate `InductiveStudy` collection
- Each study document has a reference to the user via `userId`
- Better indexing for efficient queries by user, book, chapter, and version

## New Schema

### InductiveStudy Model
```javascript
{
  userId: ObjectId (ref: 'User'),
  book: String,
  chapter: Number,
  version: String,
  observation: String,
  interpretation: String,
  application: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes
- Primary index: `{ userId: 1, book: 1, chapter: 1, version: 1 }` (unique)
- Secondary index: `{ userId: 1 }`

## Migration

To migrate existing data from the User collection to the new InductiveStudy collection:

1. Ensure your MongoDB URI is set in environment variables
2. Run the migration script:
   ```bash
   node scripts/migrate-inductive-studies.js
   ```

**Note**: Make sure to backup your database before running the migration script.

## Features

### Per-Chapter Data Isolation
- Each inductive study is tied to a specific combination of book, chapter, and version
- Users' input for Genesis 1 will only appear when viewing Genesis 1
- Data for different chapters is completely isolated

### API Changes
- Same API endpoint: `/api/inductive-study`
- Same request/response format
- Internal implementation now uses the new InductiveStudy model

### Frontend Behavior
- No changes to user interface
- Data loads automatically when user navigates to different Bible chapters
- Auto-save functionality remains the same
- Data is properly scoped per chapter/book/version combination

## Benefits

1. **Better Performance**: Separate collection allows for better indexing and faster queries
2. **Data Isolation**: Clear separation between user data and study data
3. **Scalability**: Can handle large amounts of study data without affecting user queries
4. **Maintainability**: Easier to manage and backup study data separately

## Rollback

If you need to rollback to the old structure:
1. Run a reverse migration script (not provided)
2. Update the API route to use the User model again
3. Update the User schema to include the inductiveStudies field

## Testing

After migration:
1. Test that existing studies load correctly
2. Test that new studies save correctly
3. Verify that data is properly isolated per chapter
4. Check that auto-save functionality works
