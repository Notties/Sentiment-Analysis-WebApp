// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
const getUserIdByEmail = require("@/lib/prisma/users").getUserIdByEmail;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  console.log("userData", session?.user?.email);
  console.log("getUserIdByEmail", getUserIdByEmail(session?.user?.email));

  return res.status(200).json({ userId: session?.user?.email });
}
