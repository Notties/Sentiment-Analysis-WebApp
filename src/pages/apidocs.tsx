import { useSession } from "next-auth/react";
import {
  useNote,
  useDispatchNote,
  useNotes,
  useDispatchNotes,
} from "@/module/AppContext";
import { useState } from "react";

const AboutPage = () => {

  // the current note
  const currentNote = useNote();
  const setCurrentNote = useDispatchNote();

  // the array of saved notes
  const notes = useNotes();
  const setNotes = useDispatchNotes();

  // editor note states
  const [title, setTitle] = useState("Hola");
  const [body, setBody] = useState(
    `There once was a ship that put to sea
 and the name of the ship was the billy old tea`
  );
  const [noteID, setNoteID] = useState(null);
  const [noteAction, setNoteAction] = useState("add");
  const [isSaved, setIsSaved] = useState(false);

  // user data
  const [userID, setUserID] = useState<any>(null);

  // function to save note to saved notes array
  const saveNote = async () => {

      // check if note already has an ID, if it does asign the current id to the note object,
      // if not, assign a new random ID to the note object
      // let id = noteID || RandomID(title.slice(0, 5), 5);
      // let id = noteID;

      // set userId
      // setUserID();

      // the note object
      let note = {
        // id,
        title,
        body,
        userId: userID,
      };

      console.log({ note });

      try {
        if (noteAction == "edit") {
          // add note id to note data
          // note.id = noteID;

          // send request to edit note
          let res = await fetch("/api/note", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(note),
          });

          // update note
          const updatedNote = await res.json();
          console.log("Update successful", { updatedNote });

          // edit in notes list
          setNotes({ note: updatedNote, type: "edit" });
          console.log({ note, noteAction, noteID, notes });
        } else {
          // send create request with note data
          let res = await fetch("/api/note", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(note),
          });

          const newNote = await res.json();
          console.log("Create successful", { newNote });
          // add to notes list
          setNotes({ note: newNote, type: "add" });
        }

        // change isSaved state to true, thereby disabling the save button
        setIsSaved(true);

        // clear note content
        note = { title: "", body: "", userId: null };

        // clear editor
        setTitle(note.title);
        setBody(note.body);

        // clear current note state
        setCurrentNote(note);

        // clear note ID & action
        setNoteID(null);
        setNoteAction("add");
      } catch (error) {
        console.log(error);
      }
  };

  return <button onClick={saveNote}></button>;
};

export default AboutPage;
