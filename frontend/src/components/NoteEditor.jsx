import React, { useState, useContext } from 'react';
import { Editor } from 'primereact/editor';
import { AuthContext } from '../context/AuthContext';
import api from '../api'

export const NoteEditor = ({ onNoteSaved }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user, token } = useContext(AuthContext);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      const res = await api.post(
        '/note/new',
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (onNoteSaved) onNoteSaved(res.data);
      setTitle('');
      setContent('');
    } catch (err) {
      console.error('Failed to save note:', err);
    }
  };

  return (
    <div className="text-white p-6 rounded-lg shadow-md bg-neutral-900 border border-neutral-700 mt-6">
      <h2 className="text-lg mb-4 font-semibold">Create a New Note</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title..."
        className="w-full p-2 mb-4 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <Editor
        value={content}
        onTextChange={(e) => setContent(e.htmlValue)}
        style={{ height: '320px', marginBottom: '1rem' }}
      />

      <button
        onClick={handleSave}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
      >
        Save Note
      </button>
    </div>
  );
};
