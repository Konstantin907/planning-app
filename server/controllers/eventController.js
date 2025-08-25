import EventModel from "../models/EventModel.js";

export const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createEvent = async (req, res) => {
  try {
    const newEvent = new EventModel(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// update
export const updateEvent = async (req, res) => {
  try {
    const updated = await EventModel.findByIdAndUpdate
      (req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update event', error: err });
  }
};

// delete:
export const deleteEvent = async (req, res) => {
  try {
    await EventModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted event' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete event', error: err });
  }
};

