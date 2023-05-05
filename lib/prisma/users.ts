import prisma from "./prismadb";

export const getUserByEmail = async (email: any) => {
  const user = prisma.user.findUnique({
    where: {
      email
    }
  })

  return user
}

export const getUserIdByEmail = async (email: any) => {
  const userData = await prisma.user.findUnique({
    where: {
      email
    }
  });

  return userData?.id
}