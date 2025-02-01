"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Note } from "@/lib/types";
import Alert from "@/components/ui/alert";

const fetchUserNotes = async (userId: string) => {
  const response = await fetch(`/api/notes/user/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }
  return response.json();
};

export function UserFeedNotes() {
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  const userId = session?.user?.id || "";

  const { data, error, refetch } = useQuery({
    queryKey: ["user-notes", userId],
    queryFn: () => fetchUserNotes(userId),
    enabled: !!userId,
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
          onClose={() => setAlertMessage("")}
        />
      )}

      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Privacy</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((note: Note) => (
            <TableRow key={note.id}>
              <TableCell>{note.title}</TableCell>
              <TableCell>{note.isPublic ? "public" : "private"}</TableCell>
              <TableCell className="space-x-2 flex justify-end">
                <button onClick={() => router.push(`/notes/${note.id}`)}>
                  <ExternalLink size={16} />
                </button>
                <button onClick={() => router.push(`/notes/${note.id}/edit`)}>
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() =>
                    handleDelete(
                      note.id,
                      refetch,
                      setAlertMessage,
                      setAlertType
                    )
                  }
                >
                  <Trash2 size={16} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const handleDelete = (
  noteId: string,
  refetch: () => void,
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>,
  setAlertType: React.Dispatch<React.SetStateAction<"success" | "error" | null>>
) => {
  console.log("Deleting note with ID:", noteId);
  if (!noteId) return;

  fetch(`/api/notes/${noteId}`, { method: "DELETE" })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete the note");
      }
      return res.json();
    })
    .then(() => {
      setAlertMessage("Note deleted successfully");
      setAlertType("success");
      refetch();
    })
    .catch((error) => {
      setAlertMessage(`Error: ${error.message}`);
      setAlertType("error");
    });
};
