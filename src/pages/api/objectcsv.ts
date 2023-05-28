import {
  addObjectCSV,
  editObjectCSV,
  deleteObjectCSV,
  getObjectCSVs,
  getObjectCSVByUserIdAndFilename,
} from "@/lib/prisma/csvfile";
import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //add
  if (req.method === "POST") {
    const { data, userId, filename } = req.body;

    try {
      await addObjectCSV(data, userId, filename);
      res.status(201).json({ message: "Data saved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error saving data" });
    }
  }
  //get by userId and filename
  else if (req.method === "GET" && req.query.userId && req.query.filename) {
    const { userId, filename } = req.query;

    try {
      const object = await getObjectCSVByUserIdAndFilename(
        userId as string,
        filename as string
      );
      res.status(200).json(object);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving data" });
    }
  }
  //get
  else if (req.method === "GET") {
    const { userId } = req.query;

    try {
      const objects = await getObjectCSVs(userId as string);
      res.status(200).json(objects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving data" });
    }
  }
  //edit
  else if (req.method === "PUT") {
    const { id, data } = req.body;

    try {
      await editObjectCSV(id, data);
      res.status(200).json({ message: "Data updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating data" });
    }
  }
  //delete
  else if (req.method === "DELETE") {
    const { userId, id } = req.body;

    try {
      await deleteObjectCSV(userId, id);
      res.status(200).json({ message: "Data deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting data" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
