import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface ObjectCSV {
  Filename: string;
  Text: string;
  Sentiment: string;
  Percentage: string;
}

async function saveObjectCSVToMongoDB(
  data: ObjectCSV[],
  userId: string,
  filename: string
) {
  await prisma.objectCSV.createMany({
    data: data.map((item) => ({
      filename: filename,
      text: item.Text,
      sentiment: item.Sentiment,
      percentage: item.Percentage,
      userId: userId,
    })),
  });
}

async function addObjectCSV(
  data: ObjectCSV[],
  userId: string,
  filename: string
) {
  await saveObjectCSVToMongoDB(data, userId, filename);
}

async function editObjectCSV(id: string, data: any) {
  await prisma.objectCSV.update({ where: { id }, data });
}

async function deleteObjectCSV(userId: string) {
  await prisma.objectCSV.deleteMany({
    where: {
      userId: userId
    },
  });
}

async function getObjectCSVs(userId: string) {
  return prisma.objectCSV.findMany({ where: { userId } });
}

async function getObjectCSVByUserIdAndFilename(
  userId: string,
  filename: string
) {
  return prisma.objectCSV.findMany({
    where: {
      userId: userId,
      filename: filename,
    },
  });
}

export {
  addObjectCSV,
  editObjectCSV,
  deleteObjectCSV,
  getObjectCSVs,
  getObjectCSVByUserIdAndFilename,
};
