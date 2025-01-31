import { useState, useCallback } from 'react';

export function useEditorState(initialContent: string) {
  const [content, setContent] = useState(initialContent);
  const [privacy, setPrivacy] = useState('public');

  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  const togglePrivacy = useCallback(() => {
    setPrivacy((prevPrivacy) => (prevPrivacy === 'public' ? 'private' : 'public'));
  }, []);

  return {
    content,
    privacy,
    handleContentChange,
    togglePrivacy,
  };
}