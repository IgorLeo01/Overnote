'use client'

import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Note } from "@/lib/types";
import Alert from "@/components/ui/alert";

const fetchPublicNotes = async () => {
  const response = await fetch('/api/notes');
  if (!response.ok) {
    throw new Error('Failed to fetch public notes');
  }
  return response.json();
};

export function PublicFeedNotes() {
  const router = useRouter();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);

  const { data, error, refetch } = useQuery({
    queryKey: ['public-notes'],
    queryFn: fetchPublicNotes,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {alertMessage && (
        <Alert 
          message={alertMessage} 
          type={alertType!} 
          onClose={() => setAlertMessage('')} 
        />
      )}

      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((note: Note) => (
            <TableRow key={note.id}>
              <TableCell>{note.title}</TableCell>
              <TableCell className="space-x-2 flex justify-end">
                <button onClick={() => router.push(`/notes/${note.id}`)}>
                  <ExternalLink size={16} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}