import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, FileText, Sparkles, X, Clock } from "lucide-react";
import { DashboardHeader } from "./DashboardHeader";
import { NoteEditor } from "../NoteEditor";
import api from "../../api";
import { AuthContext } from "../../context/AuthContext";

const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const quickActions = [
  {
    icon: Sparkles,
    label: "Welcome to TeamCat!",
    sub: "Get started with your workspace",
    gradient: "from-violet-600/20 to-indigo-600/20",
    iconColor: "text-violet-400",
    action: null,
  },
  {
    icon: Plus,
    label: "New page",
    sub: "Create a note or document",
    gradient: "from-emerald-600/20 to-teal-600/20",
    iconColor: "text-emerald-400",
    action: "editor",
  },
];

export const DashboardHome = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [notes, setNotes] = useState([]);
  const { user, token } = useContext(AuthContext);

  const getAllNotes = async () => {
    try {
      const res = await api.get(`/note/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes(res.data);
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <div className="w-full max-w-full">
      <DashboardHeader />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Quick actions */}
        <motion.div variants={itemVariants}>
          <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-3">
            Quick actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {quickActions.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`group relative cursor-pointer overflow-hidden rounded-xl border border-neutral-800 bg-gradient-to-br ${item.gradient} p-4 transition-colors hover:border-neutral-700`}
                onClick={() => item.action === "editor" && setShowEditor(true)}
              >
                <div className={`mb-3 inline-flex rounded-lg bg-neutral-800/60 p-2 ${item.iconColor}`}>
                  <item.icon size={18} />
                </div>
                <p className="font-semibold text-sm text-white">{item.label}</p>
                <p className="mt-0.5 text-xs text-gray-400">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Editor */}
        <AnimatePresence>
          {showEditor && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5"
            >
              <div className="relative">
                <motion.button
                  onClick={() => setShowEditor(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute -right-2 -top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800 text-gray-400 shadow-lg transition-colors hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/40 cursor-pointer"
                  aria-label="Close editor"
                >
                  <X size={14} />
                </motion.button>
                <NoteEditor
                  onNoteSaved={(note) => {
                    setNotes((prev) => [note, ...prev]);
                    setShowEditor(false);
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notes section */}
        <motion.div variants={itemVariants} className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-500">
              <FileText size={14} />
              Daily Notes
            </h2>
            {notes.length > 0 && (
              <span className="text-xs text-gray-600">
                {notes.length} note{notes.length !== 1 && "s"}
              </span>
            )}
          </div>

          {notes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-800 py-14 text-center"
            >
              <div className="mb-3 rounded-full bg-neutral-800 p-3">
                <FileText size={20} className="text-gray-500" />
              </div>
              <p className="text-sm text-gray-400">No notes yet.</p>
              <p className="mt-1 text-xs text-gray-600">
                Click "New page" above to create one.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <AnimatePresence mode="popLayout">
                {notes.map((note, i) => {
                  const text = stripHtml(note.content);
                  const preview =
                    text.length > 80 ? text.slice(0, 80) + "…" : text;

                  return (
                    <motion.div
                      key={note._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: i * 0.04,
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      layout
                      whileHover={{ y: -2 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 22,
                      }}
                      className="group cursor-pointer rounded-xl border border-neutral-800 bg-neutral-800/50 p-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800"
                    >
                      <h3 className="font-semibold text-white text-sm group-hover:text-violet-300 transition-colors">
                        {note.title || "Untitled Note"}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-gray-400 line-clamp-3">
                        {preview}
                      </p>
                      <div className="mt-3 flex items-center gap-1.5 text-gray-600">
                        <Clock size={12} />
                        <p className="text-xs">
                          {new Date(note.date).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
