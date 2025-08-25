import WeeklyTaskModel from "../models/WeeklyTaskModel.js";

export const getTasks = async(req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await WeeklyTaskModel.find({ userId }).sort({ createdAt: -1 });

        res.status(201).json({ message: 'All tasks fetched', tasks });
    } catch (error) {
        res.status(401).json({message: 'Server error occured on get!'});
    }
}

export const createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, deadline, status } = req.body;

    const newTask = new WeeklyTaskModel({
      userId,
      title,
      status, 
      deadline,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Create task error:', error); 
    res.status(500).json({ message: 'Server error occurred on creating a task!' });
  }
};

export const updateTask = async(req, res) => {
    try {
        const { id } = req.params.id;
        const { title, status, deadline } = req.body;

        const updatedTask = await WeeklyTask.findByIdAndUpdate(
        id,
            { title, status, deadline },
            { new: true }
        );

        if (!updated) return res.status(404).json({ message: "Task not found" });

        res.status(201).json({ message: 'Task updated', updatedTask });


    } catch (error) {
        res.status(401).json({message: 'Server error occured!'});
    }
}


export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await WeeklyTask.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};