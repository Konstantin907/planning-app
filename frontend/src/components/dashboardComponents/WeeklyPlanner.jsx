import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const statusOptions = ['Not started', 'In progress', 'Done'];

const statusColors = {
  'Not started': 'bg-gray-500',
  'In progress': 'bg-blue-600',
  Done: 'bg-green-600',
};

export const WeeklyPlanner = () => {
  const { user, token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newStatus, setNewStatus] = useState('Not started');
  const [newDeadline, setNewDeadline] = useState('');

  //  Fetch all tasks
  useEffect(() => {
    if (!user) return;

    const fetchTasks = async () => {
      try {
        const res = await api.get('/task', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTasks(res.data.tasks);
      } catch (error) {
        console.error(error, 'Error occurred!');
      }
    };

    fetchTasks();
  }, [user, token]);

  // Create new task
  const handleCreateTask = async () => {
    if (!newTaskTitle || !newDeadline) return;

    try {
      const res = await api.post(
        '/task/create-task',
        {
          title: newTaskTitle,
          status: newStatus,
          deadline: newDeadline,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks([res.data, ...tasks]);
      
      setNewTaskTitle('');
      setNewStatus('Not started');
      setNewDeadline('');
    } catch (error) {
      console.error(error, 'Error occurred!');
    }
  };

  return (
    <div className="p-6 text-white">
      <div>
        <img
          src="/weekly.png"
          alt=""
          className="h-[250px] w-full object-cover"
        />
      </div>

      <h2 className="text-2xl font-bold mb-4 mt-12">📋 Project Planner</h2>

      {/* Form for new task */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Task title..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="w-full px-3 py-2 rounded bg-neutral-800 border border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="w-full px-3 py-2 rounded bg-neutral-800 border border-neutral-600 text-white"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Deadline"
            value={newDeadline ? dayjs(newDeadline) : null}
            onChange={(date) => setNewDeadline(date ? date.toISOString() : "")}
            slotProps={{
              textField: {
                fullWidth: true,
                sx: {
                  backgroundColor: "#1f2937",
                  "& .MuiOutlinedInput-input": {
                    color: "white",
                  },
                  label: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#4b5563" },
                    "&:hover fieldset": { borderColor: "#60a5fa" },
                    "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
      </div>

      <button
        onClick={handleCreateTask}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        + Add Task
      </button>

      {/* Tasks table */}
      {tasks.length === 0 ? (
        <p className="mt-6 text-gray-400">
          You have no tasks yet. Add one above!
        </p>
      ) : (
        <table className="w-full table-auto text-left mt-8">
          <thead>
            <tr className="border-b border-neutral-700">
              <th className="pb-2">Status</th>
              <th className="pb-2">Title</th>
              <th className="pb-2">Deadline</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="border-b border-neutral-800">
                <td className="py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      statusColors[task.status]
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="py-2">{task.title || "Untitled"}</td>
                <td className="py-2 text-gray-400">
                  {task.deadline
                    ? new Date(task.deadline).toLocaleDateString()
                    : "No deadline"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
