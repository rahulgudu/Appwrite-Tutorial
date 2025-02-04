import { databases } from "@/utils/appwrite";
import { ID } from "appwrite";
export async function addNote(content: string): Promise<Note> {
  const newNote = { content: content };
  const response = await databases.createDocument(
    "6795bf360025d6ede5ec",
    "6795bf48000e185e7d57",
    ID.unique(),
    newNote
  );

  const note = {
    $id: response.$id,
    $createdAt: response.$createdAt,
    content: response.content,
  };

  return note;
}

export async function getNotes(): Promise<Note[]> {
  const response = await databases.listDocuments(
    "6795bf360025d6ede5ec",
    "6795bf48000e185e7d57"
  );
  console.log(response.documents);
  const notes: Note[] = response.documents.map((doc) => ({
    $id: doc.$id,
    $createdAt: doc.$createdAt,
    content: doc.content,
  }));

  return notes;
}

export async function deleteNode(noteId: string) {
  await databases.deleteDocument(
    "6795bf360025d6ede5ec",
    "6795bf48000e185e7d57",
    noteId
  );
}
