import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Plus, FileText, Sparkles, X, Clock, Pencil, Trash2 } from "lucide-react";
import { DashboardHeader } from "./DashboardHeader";
import { NoteEditor } from "../NoteEditor";
import { DeleteModal } from "../../modals/DeleteModal";
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
  const [editingNote, setEditingNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
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

  const openCreateEditor = () => {
    setEditingNote(null);
    setShowEditor(true);
  };

  const openEditEditor = (note) => {
    setEditingNote(note);
    setShowEditor(true);
  };

  const closeEditor = () => {
    setShowEditor(false);
    setEditingNote(null);
  };

  const handleNoteSaved = (note) => {
    if (editingNote) {
      setNotes((prev) =>
        prev.map((n) => (n._id === note._id ? note : n))
      );
    } else {
      setNotes((prev) => [note, ...prev]);
    }
    closeEditor();
  };

  const openDeleteModal = (note) => {
    setDeleteTarget(note);
  };

  const closeDeleteModal = () => {
    if (deletingId) return;
    setDeleteTarget(null);
  };

  const confirmDelete = async () => {
    if (!deleteTarget || deletingId) return;

    const noteId = deleteTarget._id;
    setDeletingId(noteId);

    try {
      await api.delete(`/note/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prev) => prev.filter((n) => n._id !== noteId));
      if (editingNote?._id === noteId) closeEditor();
      setDeleteTarget(null);
      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Failed to delete note:", error);
      toast.error("Failed to delete note");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="w-full max-w-full">
      <DeleteModal
        isOpen={Boolean(deleteTarget)}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Delete this note?"
        message="This action cannot be undone. The note will be permanently removed."
        itemName={deleteTarget?.title || "Untitled Note"}
        isLoading={Boolean(deletingId)}
      />

      <DashboardHeader />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
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
                onClick={() => item.action === "editor" && openCreateEditor()}
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
                  onClick={closeEditor}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute -right-2 -top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800 text-gray-400 shadow-lg transition-colors hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/40 cursor-pointer"
                  aria-label="Close editor"
                >
                  <X size={14} />
                </motion.button>
                <NoteEditor
                  key={editingNote?._id || "new"}
                  initialNote={editingNote}
                  onNoteSaved={handleNoteSaved}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
                  const isDeleting = deletingId === note._id;

                  return (
                    <motion.div
                      key={note._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: isDeleting ? 0.5 : 1,
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
                      className="group relative rounded-xl border border-neutral-800 bg-neutral-800/50 p-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800"
                    >
                      <div className="absolute right-3 top-3 flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => openEditEditor(note)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-violet-500/20 hover:text-violet-400 cursor-pointer"
                          aria-label="Edit note"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openDeleteModal(note)}
                          disabled={isDeleting}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-red-500/20 hover:text-red-400 disabled:opacity-50 cursor-pointer"
                          aria-label="Delete note"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <h3 className="pr-16 font-semibold text-white text-sm group-hover:text-violet-300 transition-colors">
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
