import mongoose from "mongoose";

const WeeklyTaskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Not started', 'In progress', 'Done'],
    default: 'Not started',
  },
  deadline: {
    type: Date,
    required: false,
  },
}, { timestamps: true });

export default mongoose.model('WeeklyTask', WeeklyTaskSchema);