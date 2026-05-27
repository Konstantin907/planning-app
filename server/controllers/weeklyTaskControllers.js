import WeeklyTaskModel from "../models/WeeklyTaskModel.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await WeeklyTaskModel.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Server error occured on get!" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, deadline, status } = req.body;
    const newTask = new WeeklyTaskModel({
      userId: req.user.id,
      title,
      status,
      deadline,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Server error occurred on creating a task!" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id, title, status, deadline } = req.body;
    const updatedTask = await WeeklyTaskModel.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { title, status, deadline },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server error occured!" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleted = await WeeklyTaskModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};
