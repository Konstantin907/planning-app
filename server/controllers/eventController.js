import EventModel from "../models/EventModel.js";

export const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find({ userId: req.user.id });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createEvent = async (req, res) => {
  try {
    const newEvent = new EventModel({
      ...req.body,
      userId: req.user.id,
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updated = await EventModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update event', error: err });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const deleted = await EventModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Deleted event' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete event', error: err });
  }
};
