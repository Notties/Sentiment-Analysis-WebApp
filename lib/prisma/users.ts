import prisma from ".";

type userType = {
    name: string,
    email: string,
    imageUrl: string
}

export async function getUsers() {
  try {
    const users = await prisma.User.findMany();
    return { users };
  } catch (error) {
    return { error };
  }
}

export async function createUser(user: userType) {
  try {
    const userFromDB = await prisma.User.create({
      data: user,
    });
    return { user: userFromDB };
  } catch (error) {
    return { error };
  }
}

export async function getUserById(id: number) {
  try {
    const user = await prisma.User.findUnique({
      where: { id },
      include: { tweets: true },
    });
    return { user };
  } catch (error) {
    return { error };
  }
}
