export interface Post {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string | null;
  published: Boolean;
  authorId: number;
}

export interface User {
  id: number;
  name: string | null;
  email: string;
  posts: Post[];
}

export interface AddUserReqBody {
  name: string;
  email: string;
}

export interface AddPostReqBody {
  title: string;
  content: string;
  authorId: number;
}
