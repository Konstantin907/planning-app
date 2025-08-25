import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
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
