const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: 2015,
    max: 2024
  },
  questions: [{
    number: {
      type: Number,
      enum: [3, 4],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    solution: {
      type: String,
      required: true
    },
    explanation: {
      type: String,
      required: true
    },
    timeComplexity: String,
    spaceComplexity: String,
    tips: [String]
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema); 