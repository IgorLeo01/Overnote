'use client'

import { useEditor, EditorContent } from '@tiptap/react';
import { tiptapExtensions } from '@/lib/tiptapExts';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface NoteEditorProps {
  initialContent: string;
  noteId: string;
  privacy: string;
  onSave: (content: string) => void;
  autosave: boolean;
  placeholder: string;

}

const NoteEditor: React.FC<NoteEditorProps> = ({ initialContent, noteId, privacy, onSave, autosave }) => {
  const [content, setContent] = useState(initialContent || '');  

  const { data: session, status } = useSession();

  const editor = useEditor({
    extensions: tiptapExtensions,
    content: initialContent || '', 
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-96 border-2 border-gray-300 p-4', 
      },
    },
    onUpdate: ({ editor }) => {
      const newContent = editor.getText(); 
      if (newContent !== content) {
        setContent(newContent); 
        onSave(newContent);  
      }
    },
    immediatelyRender: false,  
  });

  return (
    <div className="rounded-xl p-4 h-full w-full overflow-hidden">
      <EditorContent editor={editor} />
    </div>
  );
};

export default NoteEditor;
