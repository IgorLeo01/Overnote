'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import  ToolBar  from "@/components/toolbar"
import  NoteEditor  from "@/components/note-editor"
import  Alert  from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator";

export default function CreateNotePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [privacy, setPrivacy] = useState('public');
  const [title, setTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const handlePrivacyChange = (newPrivacy: string) => {
    setPrivacy(newPrivacy);
  };

  const handleSave = async () => {
    if (!title || !editorContent) {
      setAlertMessage('Title and content are required');
      setAlertType('error');
      return;
    }

    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content: editorContent, privacy, userId: session?.user?.id }),
    });

    const data = await response.json();

    if (response.status === 201) {
      setAlertMessage('Note created successfully');
      setAlertType('success');
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } else {
      setAlertMessage(`Error: ${data.message}`);
      setAlertType('error');
    }
  };

  const handleAlertClose = () => {
    setAlertMessage('');
    setAlertType(null);
  };

  return (
    <div className="flex">

      <div className="max-w-4xl mx-auto mt-8 space-y-6 flex-1">
        {alertMessage && (
          <Alert message={alertMessage} type={alertType!} onClose={handleAlertClose} />
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Create a New Note</CardTitle>
          </CardHeader>

          <Separator />

          <CardContent>
            <ToolBar 
              onChangePrivacy={handlePrivacyChange} 
              privacy={privacy} 
              onSubmit={handleSave} 
            />
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <NoteEditor 
              initialContent="" 
              noteId="" 
              privacy={privacy} 
              onSave={(content) => setEditorContent(content)} 
              autosave={false}  
              placeholder="What's on your mind?"
            />
          </CardContent>

          <CardFooter className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => router.push('/dashboard')}>
              Go Back
            </Button>
            <Button variant="default" onClick={handleSave}>
              Save Note
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
