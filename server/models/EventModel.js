import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { 
    type: String, required: true 
    },
  start: { 
    type: Date, required: true 
    },
  end: { 
    type: Date, required: true 
    },
  color: { 
    type: String, default: '#2563eb' 
    },
});

export default mongoose.model('Event', eventSchema);
