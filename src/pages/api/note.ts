
import { createNote, updateNote, deleteNote, getAllNotesByUserID } from "@/lib/prisma/note";
import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Get the current session data with {user, email, id}
  const session = await getSession({ req });

  if (req.method == "GET") {
    const { userId } = req.body;
    const note = await getAllNotesByUserID(userId);

    return res.json(note);
  }

  // Run if the request is a POST request
  if (req.method == "POST") {
    // Get note title & body from the request body
    const { title, body, userId } = req.body;

    // Create a new note
    // also pass the session which would be use to get the user information
    const note = await createNote(title, body, userId);

    // return created note
    return res.json(note);
  }

  // Run if the request is a PUT request
  else if (req.method == "PUT") {
    const { id, title, body } = req.body;
    console.log({ id, title, body });
    // const updatedData = {title, body}
    // Update current note
    // also pass the session which would be use to get the user information
    const note = await updateNote(id, { title, body }, session);

    // return updated note
    return res.json(note);
  }

  // Run if the request is a DELETE request
  else if (req.method == "DELETE") {
    const { id } = req.body;
    const note = await deleteNote(id, session);

    // return deleted note
    return res.json(note);
  }
};

export default handler;
