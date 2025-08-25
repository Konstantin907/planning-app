import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String, 
        default: '',
    },
    content: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
});


export default mongoose.model('Note', NoteSchema);