import { useEditor, EditorContent } from '@tiptap/react';
import { tiptapExtensions } from '@/lib/tiptapExts'; 
import { useState, useEffect } from 'react';

interface NoteEditorProps {
  initialContent: string;
  noteId: string;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ initialContent, noteId }) => {
  const [content, setContent] = useState(initialContent);

  const editor = useEditor({
    extensions: tiptapExtensions, 
    content: initialContent,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    const autosaveInterval = setInterval(() => {
      fetch(`/api/notes/${noteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, privacy: 'public' }),
      });
    }, 10000); 

    return () => clearInterval(autosaveInterval);
  }, [content, noteId]);

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default NoteEditor;