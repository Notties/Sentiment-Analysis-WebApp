import { createUser, getUsers } from "@/lib/prisma/users";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { users, error } = await getUsers();
      if (error) throw console.log(error);
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  if (req.method === "POST") {
    try {
      const data = req.body;
      const { user, error } = await createUser(data);
      if (error) throw console.log("createUser error: ", error);
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
