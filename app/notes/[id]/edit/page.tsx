'use client'

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import NoteEditor from "@/components/note-editor";
import ToolBar from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import Alert from "@/components/ui/alert"; 

const EditNotePage = () => {
    const { id } = useParams();
    const router = useRouter();
  
    const [note, setNote] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [privacy, setPrivacy] = useState<string>("public");
    const [editorContent, setEditorContent] = useState<string>("");
  
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);
  
    useEffect(() => {
      if (!id) return;
  
      const fetchNote = async () => {
        try {
          const res = await fetch(`/api/notes/${id}`);
          if (!res.ok) {
            throw new Error('Failed to fetch the note');
          }
          const data = await res.json();
          setNote(data);
          setEditorContent(data.content);
          setPrivacy(data.isPublic ? 'public' : 'private');
        } catch (err) {
          setAlertMessage('Error fetching the note.');
          setAlertType('error');
        } finally {
          setLoading(false);
        }
      };
  
      fetchNote();
    }, [id]);
  
    const handlePrivacyChange = (newPrivacy: string) => {
      setPrivacy(newPrivacy);
    };
  
    const handleSave = async (content: string) => {
      if (!content) {
        setAlertMessage('Content is required');
        setAlertType('error');
        return;
      }
  
      const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, privacy })
      });
  
      const data = await response.json();
      if (response.ok) {
        setAlertMessage('Note updated successfully');
        setAlertType('success');
        router.push(`/notes/${id}`);
      } else {
        setAlertMessage(`Error: ${data.message}`);
        setAlertType('error');
      }
    };
  
    if (loading) return <Skeleton className="h-16 w-full" />;
  
    return (
      <div className="note-page max-w-4xl mx-auto p-4">
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Edit Note</CardTitle>
          </CardHeader>
  
          <Separator className="my-4" />
  
          <CardContent>
            {alertMessage && (
              <Alert message={alertMessage} type={alertType!} onClose={() => setAlertMessage(null)} />
            )}
  
            <ToolBar 
              onSubmit={() => handleSave(editorContent)} 
              onChangePrivacy={handlePrivacyChange} 
              privacy={privacy} 
            />
            
            <NoteEditor
              initialContent={note.content}
              noteId={note.id}
              privacy={privacy}
              onSave={(content: string) => setEditorContent(content)}
              autosave={true} 
              placeholder="Edit your note here"
            />
          </CardContent>
  
          <CardFooter className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => router.push(`/notes/${note.id}`)}>
              Go Back
            </Button>
            <Button variant="destructive" onClick={() => handleSave(editorContent)}>
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  };

export default EditNotePage;
