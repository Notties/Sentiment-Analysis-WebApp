import prisma from ".";

// CREATE
export const createNote = async (title: any, body: any, session: any) => {
    const newNote = await prisma.note.create({
      data: {
        title,
        body,
        user: { connect: { email: session?.user?.email } },
      },
    });
  
    const note = await getNoteByID(newNote.id);
  
    return note;
  };
  
  // READ
  //get unique note by id
  export const getNoteByID = async (id: any) => {
    const note = await prisma.note.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
  
    return note;
  };
  
  // get all notes
  export const getAllNotes = async () => {
    const notes = await prisma.note.findMany({
      include: {
        user: true,
      },
    });
  
    return notes;
  };
  
  // get notes by user
  export const getAllNotesByUserID = async (id: any) => {
    const notes = await prisma.note.findMany({
      where: {
        userId: id,
      },
      include: {
        user: true,
      },
    });
  
    return notes;
  };
  
  // UPDATE
  export const updateNote = async (id: any, updatedData: any, session: any) => {
    let userId = session?.user.id;
    const updatedNote = await prisma.note.update({
      where: {
        id_userId: {
          id,
          userId,
        },
      },
      data: {
        ...updatedData,
      },
    });
  
    const note = await getNoteByID(updatedNote.id);
  
    return note;
  };
  
  // DELETE
  export const deleteNote = async (id: any, session: any) => {
    let userId = session?.user.id;
  
    const deletedNote = await prisma.note.delete({
      where: {
        id_userId: {
          id,
          userId,
        },
      },
    });
  
    return deletedNote;
  };
  