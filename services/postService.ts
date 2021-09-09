import { AddPostReqBody, Post } from "../types/types";
import { PrismaClient } from "@prisma/client";

const { post } = new PrismaClient();

export const getPosts = async (): Promise<Post[]> => {
  const posts: Post[] = await post.findMany({
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      title: true,
      content: true,
      published: true,
      authorId: true,
    },
  });
  return posts;
};

export const getPostById = async (id: number): Promise<Post | Object> => {
  const resPost = await post.findUnique({
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      title: true,
      content: true,
      published: true,
      author: true,
    },
    where: {
      id,
    },
  });
  return resPost !== null ? resPost : { error: `post with id=${id} not found` };
};

export const addPost = async (data: AddPostReqBody): Promise<Post | Object> => {
  return await post.create({
    data,
  });
};
