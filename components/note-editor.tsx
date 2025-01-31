import { useEditor, EditorContent } from '@tiptap/react';
import { tiptapExtensions } from '@/lib/tiptapExts'; 
import { useState, useEffect } from 'react';

interface NoteEditorProps {
  initialContent: string;
  noteId: string;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ initialContent, noteId }) => {
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);

  const editor = useEditor({
    extensions: tiptapExtensions, 
    content: initialContent,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    const autosaveInterval = setInterval(async () => {
      if (saving) return;
      setSaving(true);

      await fetch(`/api/notes/${noteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, privacy: 'public' }),
      });

      setSaving(false); 
    }, 5000); 

    return () => clearInterval(autosaveInterval);
  }, [content, noteId, saving]);

  return (
    <div>
      {saving && <div className="text-blue-500">Saving...</div>} 
      <EditorContent editor={editor} />
    </div>
  );
};

export default NoteEditor;
