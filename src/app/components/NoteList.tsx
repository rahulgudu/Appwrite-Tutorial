"use client";
import { useEffect, useState } from "react";
import { deleteNode } from "../actions/notesActions";
import { client } from "@/utils/appwrite";

export default function NoteList({ initialNotes }: { initialNotes: Note[] }) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);

  useEffect(() => {
    const channel =
      "databases.6795bf360025d6ede5ec.collections.6795bf48000e185e7d57.documents";

    const unsubscribe = client.subscribe(channel, (res) => {
      const eventType = res.events[0];
      console.log(eventType);
      const changeNote = res.payload as Note;

      if (eventType.includes("create")) {
        setNotes((prevNotes) => [...prevNotes, changeNote]);
      }
      if (eventType.includes("delete")) {
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note.$id !== changeNote.$id)
        );
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (noteId: string) => {
    const element = document.getElementById(noteId);
    if (element) {
      element.classList.add("crossed-out");
    }
    await deleteNode(noteId);
  };

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.$id} id={note.$id} onClick={() => handleDelete(note.$id)}>
          <p>{note.content}</p>
        </li>
      ))}
    </ul>
  );
}
