import NoteModel from "../models/NoteModel.js";


export const createNote = async(req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.id;

        const newNote = new NoteModel({ userId, title, content });
        await newNote.save();

        res.status(201).json(newNote);
    } catch (error) {
        res.status(401).json({ message: "Server error during creating note" });
    }
}

export const getNotesByUser = async(req, res) => {
    try {
        const notes = await NoteModel.find({ userId: req.params.userId }).sort({ date: -1 });
        res.json(notes);
        
    } catch (error) {
        res.status(401).json({ message: "Failed to fetch notes!" });
    }
}