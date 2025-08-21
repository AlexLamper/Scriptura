# 🗄️ Database Setup Instructions

## What You Need to Create

Create a new collection called `inductivestudies` in your MongoDB database.

## Collection Structure

The collection will automatically get this structure when users start saving data:

```javascript
{
  _id: ObjectId("..."),
  userId: ObjectId("..."),        // Reference to user
  book: "Genesis",                // Bible book name
  chapter: 1,                     // Chapter number
  version: "Staten Vertaling",    // Bible version
  observation: "User's text...",  // What they observed
  interpretation: "User's text...", // What it means
  application: "User's text...",  // How to apply it
  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}
```

## Index to Create (Optional but Recommended)

For better performance, create this compound index:

```javascript
db.inductivestudies.createIndex({ 
  "userId": 1, 
  "book": 1, 
  "chapter": 1, 
  "version": 1 
}, { 
  unique: true 
})
```

## Migration of Existing Data (Optional)

If you have existing inductive studies in your `users` collection under the `inductiveStudies` field, you can migrate them:

### Option 1: Manual Migration Query
```javascript
// Find users with inductive studies
db.users.find({ inductiveStudies: { $exists: true, $ne: [] } }).forEach(function(user) {
    user.inductiveStudies.forEach(function(study) {
        db.inductivestudies.insertOne({
            userId: user._id,
            book: study.book,
            chapter: study.chapter,
            version: study.version,
            observation: study.observation || "",
            interpretation: study.interpretation || "",
            application: study.application || "",
            createdAt: study.createdAt || new Date(),
            updatedAt: study.updatedAt || new Date()
        });
    });
    
    // Remove old field from user
    db.users.updateOne(
        { _id: user._id },
        { $unset: { inductiveStudies: "" } }
    );
});
```

### Option 2: Keep Both (Safe Option)
Just create the new collection and let users start fresh. The old data stays in the `users` collection as backup.

## Verification

After creating the collection, run:
```bash
npm run setup-code-only
```

This will verify all code files are in place and ready to use the new collection.

## Result

✅ Each Bible chapter will have completely isolated data  
✅ Genesis 1 studies only show on Genesis 1  
✅ Better performance with proper indexing  
✅ Scalable architecture for unlimited studies  

That's it! 🚀
