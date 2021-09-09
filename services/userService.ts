import { User, Post, AddUserReqBody } from "../types/types";
import { PrismaClient } from "@prisma/client";

const { user } = new PrismaClient();

export const getUsers = async (): Promise<User[]> => {
  const users: User[] = await user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      posts: true,
    },
  });
  return users;
};

export const getUserById = async (id: number): Promise<User | Object> => {
  const resUser = await user.findUnique({
    select: {
      email: true,
      name: true,
      posts: true,
    },
    where: {
      id,
    },
  });
  return resUser !== null ? resUser : { error: `user with id=${id} not found` };
};

export const addUser = async (data: AddUserReqBody): Promise<User | Object> => {
  const userExists = await user.findUnique({
    where: {
      email: data.email,
    },
    select: {
      name: true,
    },
  });
  if (userExists) return { error: "email already in use" };
  return await user.create({
    data,
  });
};
