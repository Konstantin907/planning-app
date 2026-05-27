import { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, CalendarClock, ClipboardList } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const statusOptions = ['Not started', 'In progress', 'Done'];

const statusConfig = {
  'Not started': { bg: 'bg-gray-500/20', text: 'text-gray-300', dot: 'bg-gray-400' },
  'In progress': { bg: 'bg-blue-500/20', text: 'text-blue-300', dot: 'bg-blue-400' },
  Done: { bg: 'bg-emerald-500/20', text: 'text-emerald-300', dot: 'bg-emerald-400' },
};

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, x: -12, transition: { duration: 0.2 } },
};

function formatDeadline(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.ceil((d - now) / (1000 * 60 * 60 * 24));

  const formatted = d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });

  let color = 'text-violet-400';
  if (diff < 0) color = 'text-red-400';
  else if (diff <= 2) color = 'text-amber-400';

  return { formatted, color };
}

export const WeeklyPlanner = () => {
  const { user, token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newStatus, setNewStatus] = useState('Not started');
  const [newDeadline, setNewDeadline] = useState('');

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
    <div className="w-full text-white">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src="/weekly.png"
          alt=""
          className="h-[180px] sm:h-[220px] md:h-[250px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
        <div className="absolute bottom-4 left-5 sm:bottom-6 sm:left-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/80 backdrop-blur-sm">
            <ClipboardList size={20} />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight drop-shadow-lg">
            Project Planner
          </h2>
        </div>
      </div>

      {/* task form */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-8 rounded-xl border border-neutral-800 bg-neutral-800/40 backdrop-blur-sm p-4 sm:p-5"
      >
        <p className="mb-3 text-sm font-medium text-gray-400 tracking-wide">New task</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Task title..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
          />

          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm outline-none transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
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
              onChange={(date) => setNewDeadline(date ? date.toISOString() : '')}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                  sx: {
                    backgroundColor: '#171717',
                    borderRadius: '0.5rem',
                    '& .MuiOutlinedInput-input': { color: 'white', fontSize: '0.875rem' },
                    '& .MuiInputLabel-root': { color: '#9ca3af' },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '0.5rem',
                      '& fieldset': { borderColor: '#404040' },
                      '&:hover fieldset': { borderColor: '#8b5cf6' },
                      '&.Mui-focused fieldset': { borderColor: '#8b5cf6' },
                    },
                    '& .MuiSvgIcon-root': { color: '#9ca3af' },
                  },
                },
              }}
            />
          </LocalizationProvider>
        </div>

        <motion.button
          onClick={handleCreateTask}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium text-white shadow-sm shadow-violet-600/30 transition-colors hover:bg-violet-500"
        >
          <Plus size={16} /> Add Task
        </motion.button>
      </motion.div>

      {/* list */}
      <div className="mt-8">
        {tasks.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 py-12 text-sm"
          >
            No tasks yet — add one above to get started.
          </motion.p>
        ) : (
          <>
            {/* Column headers */}
            <div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[140px_1fr_150px] gap-4 px-4 pb-3 text-xs font-medium uppercase tracking-wider text-gray-500 border-b border-neutral-800">
              <span>Status</span>
              <span>Title</span>
              <span className="text-right sm:text-left">Deadline</span>
            </div>

            <AnimatePresence mode="popLayout">
              {tasks.map((task, i) => {
                const cfg = statusConfig[task.status] || statusConfig['Not started'];
                const deadline = formatDeadline(task.deadline);

                return (
                  <motion.div
                    key={task._id}
                    custom={i}
                    variants={rowVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    layout
                    className="group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[140px_1fr_150px] gap-4 items-center px-4 py-3 border-b border-neutral-800/60 transition-colors hover:bg-neutral-800/40 rounded-lg"
                  >
                    {/* Status pill */}
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${cfg.bg} ${cfg.text}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                      {task.status}
                    </span>

                    {/* Title */}
                    <span className="truncate text-sm text-gray-200 group-hover:text-white transition-colors">
                      {task.title || 'Untitled'}
                    </span>

                    {/* Deadline */}
                    {deadline ? (
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium ${deadline.color} justify-end sm:justify-start`}
                      >
                        <CalendarClock size={13} className="shrink-0" />
                        {deadline.formatted}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-600 text-right sm:text-left">
                        No deadline
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};
