import { useContext, useEffect, useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { NoteEditor } from "../NoteEditor";
import api from "../../api";
import { AuthContext } from "../../context/AuthContext";

const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

export const DashboardHome = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [notes, setNotes] = useState([]);
  const { user, token } = useContext(AuthContext);

 const handleSave = async (newNoteHtml) => {
  const noteData = {
    title: "Untitled",
    content: newNoteHtml,
  };

  try {
    const res = await api.post('/note/create', noteData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setNotes((prev) => [res.data, ...prev]);
    setShowEditor(false);
  } catch (error) {
    console.error("Error creating note:", error);
  }
};


  // listing notes:
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
    <div className="flex-1 p-6 overflow-y-auto">
      <DashboardHeader />

      <div className="mt-8">
        <h2 className="text-lg primary">Create New Task</h2>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div className="bg-neutral-800 rounded-lg p-4 hover:bg-neutral-700 transition cursor-pointer">
            👋 <div className="font-semibold mt-2">Welcome to TeamCat!</div>
          </div>
          <div
            className="bg-neutral-800 rounded-lg p-4 hover:bg-neutral-700 transition cursor-pointer"
            onClick={() => setShowEditor(true)}
          >
            ➕ <div className="font-semibold mt-2">New page</div>
          </div>
        </div>

        {/* editor */}
        {showEditor && (
          <NoteEditor
            className="mt-6 bg-neutral-800 rounded-lg p-4 border border-neutral-700"
            onSave={handleSave}
          />
        )}

        <h2 className="text-lg primary mt-10">Daily Notes</h2>
        <div className="mt-4 space-y-4">
          {notes.length === 0 && <p className="text-gray-400">No notes yet.</p>}

          <div className="mt-6 space-y-4">
            {notes.map((note) => {
              const text = stripHtml(note.content);
              const preview = text.length > 50 ? text.slice(0, 50) + "…" : text;

              return (
                <div
                  key={note._id}
                  className="bg-neutral-800 p-4 rounded shadow"
                >
                  <h3 className="text-white font-semibold text-lg">
                    {note.title || "Untitled Note"}
                  </h3>
                  <p className="text-gray-300 mt-2 text-sm">{preview}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(note.date).toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
