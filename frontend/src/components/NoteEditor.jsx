import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Editor } from 'primereact/editor';
import { Save, Loader2, Type } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import api from '../api';

export const NoteEditor = ({ initialNote, onNoteSaved }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const { token } = useContext(AuthContext);
  const isEditing = Boolean(initialNote?._id);

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title || '');
      setContent(initialNote.content || '');
    } else {
      setTitle('');
      setContent('');
    }
  }, [initialNote]);

  const canSave = title.trim() && content && content.trim();

  const handleSave = async () => {
    if (!canSave || saving) return;
    setSaving(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = isEditing
        ? await api.put(
            `/note/${initialNote._id}`,
            { title, content },
            config
          )
        : await api.post('/note/new', { title, content }, config);

      if (onNoteSaved) onNoteSaved(res.data);
      if (!isEditing) {
        setTitle('');
        setContent('');
      }
    } catch (err) {
      console.error('Failed to save note:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-700/60 bg-gradient-to-b from-neutral-800/80 to-neutral-900 p-5 sm:p-6 shadow-xl shadow-black/30 text-white">
      <div className="mb-5 flex items-center gap-2.5">
        <div className="rounded-lg bg-violet-500/20 p-2 text-violet-400">
          <Type size={16} />
        </div>
        <h2 className="text-base font-semibold tracking-tight">
          {isEditing ? 'Edit Note' : 'Create a New Note'}
        </h2>
      </div>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Give your note a title..."
        className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 mb-4"
      />

      <div className="rounded-lg overflow-hidden border border-neutral-700 [&_.ql-toolbar]:!bg-neutral-800 [&_.ql-toolbar]:!border-b-neutral-700 [&_.ql-container]:!bg-neutral-900 [&_.ql-container]:!border-none [&_.ql-editor]:!text-gray-200 [&_.ql-editor]:!min-h-[240px] [&_.ql-editor.ql-blank::before]:!text-gray-500 [&_.ql-snow_.ql-stroke]:!stroke-gray-400 [&_.ql-snow_.ql-fill]:!fill-gray-400 [&_.ql-snow_.ql-picker-label]:!text-gray-400">
        <Editor
          value={content}
          onTextChange={(e) => setContent(e.htmlValue)}
          style={{ height: '280px' }}
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-gray-600">
          {canSave ? 'Ready to save' : 'Fill in a title and content'}
        </p>
        <motion.button
          onClick={handleSave}
          disabled={!canSave || saving}
          whileHover={{ scale: canSave && !saving ? 1.03 : 1 }}
          whileTap={{ scale: canSave && !saving ? 0.97 : 1 }}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium text-white shadow-sm shadow-violet-600/30 transition-colors hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={14} />
              {isEditing ? 'Update Note' : 'Save Note'}
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};
