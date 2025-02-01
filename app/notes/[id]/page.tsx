'use client'

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useSession } from 'next-auth/react';

interface Note {
  id: string;
  title: string;
  content: string;
  isPublic: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const NotePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [note, setNote] = useState<Note | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
      } catch (err) {
        setError('Error fetching note');
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (loading) return <Skeleton className="h-16 w-full" />;

  const isOwner = session?.user?.id === note?.userId;

  return (
    <div className="note-page max-w-4xl mx-auto p-4">
      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/path-to-your-avatar-image.jpg" alt="User Avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{note?.title}</CardTitle>
              <CardDescription>{note?.isPublic ? "This note is public" : "This note is private"}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <Separator className="my-4" />

        <CardContent>
          <p>{note?.content}</p>
        </CardContent>

        <CardFooter className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => router.push('/dashboard')}>
            Go Back
          </Button>
          <Button
            variant="default"
            onClick={() => navigator.clipboard.writeText(window.location.href)}
          >
            Copy Public Link
          </Button>
          {isOwner && (
            <Button variant="destructive" onClick={() => router.push(`/notes/${note?.id}/edit`)}>
              Edit
            </Button>
          )}
        </CardFooter>
      </Card>

    </div>
  );
};

export default NotePage;
