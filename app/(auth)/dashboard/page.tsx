'use client'

import { useEffect, useState } from "react";
import { UserFeedNotes } from "@/components/user-feed-notes";
import { PublicFeedNotes } from "@/components/public-feed-notes";  
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadData = () => {
    setIsMounted(true);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Card className="aspect-video rounded-xl bg-white shadow-lg">
            <CardHeader>
              <CardTitle>Your Notes</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
              <UserFeedNotes />
            </CardContent>
          </Card>

          <Card className="aspect-video rounded-xl bg-white shadow-lg">
            <CardHeader>
              <CardTitle>Public Notes</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
              <PublicFeedNotes />
            </CardContent>
          </Card>
        </div>

        <Button
          variant="default"
          className="bg-[#3D550C] hover:bg-[#81B622] text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
          onClick={() => router.push('/create-note')}
        >
          Create New Note
        </Button>
      </div>
    </div>
  );
}
