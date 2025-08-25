import TasksModel from "../models/TasksModel.js";

export const getTasks = async (req, res) => {
  try {
    const { weekStart } = req.query;

    const startOfWeek = new Date(weekStart);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    const allTasks = await TasksModel.find({
      userId: req.user.id,
      createdAt: {
        $gte: startOfWeek,
        $lte: endOfWeek,
      },
    });

    res.status(200).json({ tasks: allTasks });
  } catch (error) {
    res.status(500).json({ message: 'Server error during getting tasks' });
  }
};


export const updateTask = async(req, res) => {
  try {
    console.log("Updating Task", req.params.id, req.user.id, req.body);

    const task = await TasksModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { isCompleted: req.body.isCompleted },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(500).json({ message: "Server error during updating tasks" });
  }
};



export const createTasks = async(req, res) => {
    try {
        const { title, day } = req.body;

        const createdTask = new TasksModel({
            userId: req.user.id,
            title,
            day,
        });

        await createdTask.save();
        res.status(201).json(createdTask);

    } catch (error) {
        res.status(401).json({ message: "Server error during creating task" });
    }
}



export const deleteTask = async(req, res) => {
    try {
        await TasksModel.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        res.status(201).json({ message: 'Task is successfully deleted!' })
    } catch (error) {
        res.status(401).json({ message: "Failed to delete task!" });
    }
}
