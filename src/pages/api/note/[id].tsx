import Head from "next/head";
import Image from "next/image";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const getNoteByID = require("@/lib/prisma/note").getNoteByID;

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    res.statusCode = 403;
    return { props: { note: null } };
  }

  const note = await getNoteByID(req.query.id);
  console.log({ note });

  return {
    props: { note },
  };
}

const Note = ({ note }: any) => {
  if (note == null) {
    return (
      <>
        <Head>
          <title>Login to view note</title>
          <meta name="description" content="Login to view this note" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>
          <main>
            <header>
              <h1>Oops... You have to login to view this note</h1>
            </header>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{note.title}</title>
        <meta name="description" content={`By ${note.user.name}`} />
      </Head>
      <h2>{note.title}</h2>
      <p>{note.body}</p>

      <Image
        src={note.user.image}
        alt={note.user.name}
        width={48}
        height={48}
        className="rounded-full"
      />
    </>
  );
};

export default Note;
