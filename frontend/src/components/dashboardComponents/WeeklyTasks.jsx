import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const WeeklyTasks = () => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [showInputFor, setShowInputFor] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [weekStart, setWeekStart] = useState(dayjs());

  // 🔁 Fetch tasks
useEffect(() => {
  const fetchTasks = async () => {
    try {
      const res = await api.get('/', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          weekStart: weekStart.startOf('week').add(1, 'day').toISOString(),
        },
      });
      setTasks(Array.isArray(res.data.tasks) ? res.data.tasks : []);
    } catch (error) {
      console.error('Error fetching weekly tasks:', error);
    }
  };

  fetchTasks();
}, [token, weekStart]);

  // Toggle checkbox
  const handleToggle = async (taskId, currentDone) => {
    try {
      await api.put(
        `weekly/update/${taskId}`,
        { isCompleted: !currentDone },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks((prev) =>
        Array.isArray(prev)
          ? prev.map((task) =>
              task._id === taskId
                ? { ...task, isCompleted: !currentDone }
                : task
            )
          : []
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // ➕ Add new task
  const handleAddTask = async (day) => {
    if (!newTaskTitle.trim()) return;
    try {
      const res = await api.post(
        "weekly/create",
        { title: newTaskTitle, day },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks((prev) =>
        Array.isArray(prev) ? [res.data, ...prev] : [res.data]
      );
      setNewTaskTitle("");
      setShowInputFor(null);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // by day
  const groupedTasks = daysOfWeek.reduce((acc, day) => {
    acc[day] = Array.isArray(tasks) ? tasks.filter((t) => t.day === day) : [];
    return acc;
  }, {});

  // 📅 Format week text
  const formatWeekRange = (date) => {
    const start = dayjs(date).startOf("week").add(1, "day");
    const end = start.add(6, "day");
    return `${start.format("MMMM D")} - ${end.format("MMMM D")}`;
  };

  return (
    <div className="text-white p-6">
      <h2 className="text-3xl font-bold mb-6">📅 Weekly To-do List</h2>

      <div className="mb-12">
        <h4 className="text-md tracking-wide text-slate-300">
          Add your weekly to-do’s. Click + to add new task under each day.
        </h4>

        <div className="flex items-center gap-4 mt-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
            label="Select week"
            value={weekStart}
            onChange={(newValue) => setWeekStart(newValue)}
            slotProps={{
              textField: {
                InputProps: {
                  style: {
                    color: "white", 
                  },
                },
                InputLabelProps: {
                  style: {
                    color: "white",
                  },
                },
                sx: {
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                },
              },
            }}
          />
          </LocalizationProvider>
          <h2 className="text-lg font-semibold text-white">
            Week: {formatWeekRange(weekStart)}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="group">
            <div className="flex justify-between items-center mb-1">
              <h3 className="bg-neutral-800 text-white px-3 py-2 font-semibold rounded">
                {day}
              </h3>
              <button
                onClick={() => setShowInputFor(day)}
                className="opacity-0 group-hover:opacity-100 text-xl text-blue-400 hover:text-blue-600 transition"
              >
                +
              </button>
            </div>

            {showInputFor === day && (
              <div className="mt-2 flex flex-col gap-2">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="New task..."
                  className="px-3 py-1 rounded bg-neutral-800 border border-neutral-600 text-white"
                />
                <button
                  onClick={() => handleAddTask(day)}
                  className="bg-blue-600 hover:bg-blue-700 transition px-2 py-1 rounded text-sm"
                >
                  Add
                </button>
              </div>
            )}

            <div className="mt-2 space-y-1">
              {groupedTasks[day]?.map((task) => (
                <label
                  key={task._id}
                  className="flex items-center gap-2 group/task"
                >
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => handleToggle(task._id, task.isCompleted)}
                  />
                  <span
                    className={`flex-1 ${
                      task.isCompleted
                        ? "line-through text-white/70 decoration-2 decoration-white"
                        : ""
                    }`}
                  >
                    {task.title}
                  </span>
                  <button
                    className="text-xs text-gray-400 opacity-0 group-hover/task:opacity-100 hover:text-white"
                    onClick={() => alert("Implement edit logic")}
                  >
                    Edit
                  </button>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
