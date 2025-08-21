import mongoose from 'mongoose';

const inductiveStudySchema = new mongoose.Schema({
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

// Compound index for efficient querying by user, book, and chapter
inductiveStudySchema.index({ userId: 1, book: 1, chapter: 1, version: 1 }, { unique: true });

const InductiveStudy = mongoose.models.InductiveStudy || mongoose.model('InductiveStudy', inductiveStudySchema);

export default InductiveStudy;
