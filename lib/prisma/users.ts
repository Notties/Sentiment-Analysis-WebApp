import prisma from ".";

export async function getUsers() {
  try {
    const users = await prisma.User.findMany();
    return { users };
  } catch (error) {
    return { error };
  }
}

export async function createUser(user: any) {
  try {
    const userFromDB = await prisma.User.create({
      data: user,
    });
    return { user: userFromDB };
  } catch (error) {
    return { error };
  }
}

export async function getUserById(id: any) {
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
