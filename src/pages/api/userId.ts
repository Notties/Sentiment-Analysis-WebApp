// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const getUserIdByEmail = require("@/lib/prisma/users").getUserIdByEmail;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const userId = await getUserIdByEmail(req.body.email);

    return res.status(200).json({userId});
  }
}
