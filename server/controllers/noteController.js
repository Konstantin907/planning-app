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

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await NoteModel.findOne({
            _id: req.params.noteId,
            userId: req.user.id,
        });

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        note.title = title;
        note.content = content;
        await note.save();

        res.json(note);
    } catch (error) {
        res.status(500).json({ message: "Failed to update note" });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const note = await NoteModel.findOneAndDelete({
            _id: req.params.noteId,
            userId: req.user.id,
        });

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json({ message: "Note deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete note" });
    }
};