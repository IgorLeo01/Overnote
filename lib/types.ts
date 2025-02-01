export interface Note {
    id: string;
    title: string;
    content: string;
    isPublic: 'public' | 'private';
    userId: string;
    user: string;
    createdAt: string;
    updatedAt: string;
  }
  