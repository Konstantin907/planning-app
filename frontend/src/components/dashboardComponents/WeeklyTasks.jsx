import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Pencil,
  ListChecks,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api";
import dayjs from "dayjs";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const dayColors = {
  Mon: "from-violet-500/25 to-violet-600/10 border-violet-500/30",
  Tue: "from-blue-500/25 to-blue-600/10 border-blue-500/30",
  Wed: "from-cyan-500/25 to-cyan-600/10 border-cyan-500/30",
  Thu: "from-emerald-500/25 to-emerald-600/10 border-emerald-500/30",
  Fri: "from-amber-500/25 to-amber-600/10 border-amber-500/30",
  Sat: "from-orange-500/25 to-orange-600/10 border-orange-500/30",
  Sun: "from-rose-500/25 to-rose-600/10 border-rose-500/30",
};

const dayAccents = {
  Mon: "bg-violet-500",
  Tue: "bg-blue-500",
  Wed: "bg-cyan-500",
  Thu: "bg-emerald-500",
  Fri: "bg-amber-500",
  Sat: "bg-orange-500",
  Sun: "bg-rose-500",
};

const dayBtnAccents = {
  Mon: "bg-violet-600 hover:bg-violet-500",
  Tue: "bg-blue-600 hover:bg-blue-500",
  Wed: "bg-cyan-600 hover:bg-cyan-500",
  Thu: "bg-emerald-600 hover:bg-emerald-500",
  Fri: "bg-amber-600 hover:bg-amber-500",
  Sat: "bg-orange-600 hover:bg-orange-500",
  Sun: "bg-rose-600 hover:bg-rose-500",
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export const WeeklyTasks = () => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [showInputFor, setShowInputFor] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [weekStart, setWeekStart] = useState(dayjs());

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/", {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            weekStart: weekStart.startOf("week").add(1, "day").toISOString(),
          },
        });
        setTasks(Array.isArray(res.data.tasks) ? res.data.tasks : []);
      } catch (error) {
        console.error("Error fetching weekly tasks:", error);
      }
    };

    fetchTasks();
  }, [token, weekStart]);

  const handleToggle = async (taskId, currentDone) => {
    try {
      await api.put(
        `weekly/update/${taskId}`,
        { isCompleted: !currentDone },
        { headers: { Authorization: `Bearer ${token}` } }
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

  const handleAddTask = async (day) => {
    if (!newTaskTitle.trim()) return;
    try {
      const res = await api.post(
        "weekly/create",
        { title: newTaskTitle, day },
        { headers: { Authorization: `Bearer ${token}` } }
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

  const groupedTasks = daysOfWeek.reduce((acc, day) => {
    acc[day] = Array.isArray(tasks) ? tasks.filter((t) => t.day === day) : [];
    return acc;
  }, {});

  const formatWeekRange = (date) => {
    const start = dayjs(date).startOf("week").add(1, "day");
    const end = start.add(6, "day");
    return `${start.format("MMM D")} – ${end.format("MMM D")}`;
  };

  const shiftWeek = (dir) => {
    setWeekStart((prev) => prev.add(dir * 7, "day"));
  };

  const isToday = (dayAbbr) => {
    const todayIdx = (new Date().getDay() + 6) % 7;
    return daysOfWeek[todayIdx] === dayAbbr;
  };

  const totalDone = Array.isArray(tasks)
    ? tasks.filter((t) => t.isCompleted).length
    : 0;
  const totalTasks = Array.isArray(tasks) ? tasks.length : 0;

  return (
    <div className="w-full text-white">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="rounded-xl bg-violet-500/20 p-2.5 text-violet-400">
              <ListChecks size={22} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Weekly To-do
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1 ml-[52px] hidden sm:block">
            Click <span className="text-gray-300">+</span> on any day to add a task
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => shiftWeek(-1)}
            className="rounded-lg border border-neutral-700 bg-neutral-800/60 p-2 text-gray-400 transition-colors hover:bg-neutral-700 hover:text-white cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800/60 px-4 py-2">
            <CalendarDays size={15} className="text-violet-400 shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">
              {formatWeekRange(weekStart)}
            </span>
          </div>

          <button
            onClick={() => shiftWeek(1)}
            className="rounded-lg border border-neutral-700 bg-neutral-800/60 p-2 text-gray-400 transition-colors hover:bg-neutral-700 hover:text-white cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </motion.div>

      {totalTasks > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-5 flex items-center gap-3"
        >
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-800">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
              initial={{ width: 0 }}
              animate={{
                width: `${totalTasks > 0 ? (totalDone / totalTasks) * 100 : 0}%`,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
          <span className="shrink-0 text-xs text-gray-500">
            {totalDone}/{totalTasks} done
          </span>
        </motion.div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mt-6 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3"
      >
        {daysOfWeek.map((day) => {
          const dayTasks = groupedTasks[day] || [];
          const doneCount = dayTasks.filter((t) => t.isCompleted).length;
          const today = isToday(day);

          return (
            <motion.div
              key={day}
              variants={cardVariants}
              className={`group relative flex min-h-[180px] flex-col rounded-xl border bg-gradient-to-b p-3 transition-colors ${dayColors[day]} ${
                today ? "ring-1 ring-violet-500/40" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${dayAccents[day]}`}
                  />
                  <span className="text-sm font-semibold tracking-wide">
                    {day}
                  </span>
                  {today && (
                    <span className="rounded-full bg-violet-500/30 px-2 py-0.5 text-[10px] font-medium text-violet-300">
                      Today
                    </span>
                  )}
                </div>
                <button
                  onClick={() =>
                    setShowInputFor(showInputFor === day ? null : day)
                  }
                  className="flex h-6 w-6 items-center justify-center rounded-md text-gray-500 opacity-0 transition-all group-hover:opacity-100 hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>

              {dayTasks.length > 0 && (
                <p className="mb-2 text-[10px] text-gray-500">
                  {doneCount}/{dayTasks.length}
                </p>
              )}

              <AnimatePresence>
                {showInputFor === day && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden mb-2"
                  >
                    <div className="flex flex-col gap-1.5">
                      <input
                        autoFocus
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleAddTask(day)
                        }
                        placeholder="New task..."
                        className="w-full rounded-lg border border-neutral-600/60 bg-neutral-900/80 px-2.5 py-1.5 text-xs text-white placeholder:text-gray-500 outline-none transition-colors focus:border-violet-500"
                      />
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddTask(day)}
                        className={`w-full rounded-lg px-2 py-1.5 text-xs font-medium text-white transition-colors cursor-pointer ${dayBtnAccents[day]}`}
                      >
                        Add
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex-1 space-y-1">
                <AnimatePresence mode="popLayout">
                  {dayTasks.map((task) => (
                    <motion.label
                      key={task._id}
                      layout
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 6 }}
                      transition={{ duration: 0.2 }}
                      className="group/task flex items-start gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/5 cursor-pointer"
                    >
                      <button
                        onClick={() =>
                          handleToggle(task._id, task.isCompleted)
                        }
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all cursor-pointer ${
                          task.isCompleted
                            ? `${dayAccents[day]} border-transparent`
                            : "border-gray-600 hover:border-gray-400"
                        }`}
                      >
                        {task.isCompleted && (
                          <Check size={10} className="text-white" />
                        )}
                      </button>
                      <span
                        className={`flex-1 text-xs leading-snug transition-all ${
                          task.isCompleted
                            ? "text-gray-500 line-through decoration-gray-600"
                            : "text-gray-200"
                        }`}
                      >
                        {task.title}
                      </span>
                      <button className="mt-0.5 shrink-0 text-gray-600 opacity-0 transition-opacity group-hover/task:opacity-100 hover:text-gray-300 cursor-pointer">
                        <Pencil size={10} />
                      </button>
                    </motion.label>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
