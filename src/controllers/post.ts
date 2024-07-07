import { Context } from "hono";
import { posts } from "../db/posts";

export const createPostHandler = async (c: Context) => {
  const { title, content } = await c.req.json();
  if (!title || !content) {
    return c.json({ message: "Bad request" }, 400);
  }

  const post = {
    id: posts.length + 1,
    title,
    content,
  };

  posts.push(post);

  return c.json({ ...post });
};

export const deletePostHandler = (c: Context) => {
  const id = c.req.param("id");
  const postIndex = posts.findIndex((post) => post.id === Number(id));
  if (postIndex === -1) {
    return c.json({ message: "Post not found" }, 404);
  }

  posts.filter((post) => post.id !== Number(id));
  return c.json({ message: "Post deleted" });
};

export const getPostHandler = (c: Context) => {
  const id = c.req.param("id");
  const postIndex = posts.findIndex((post) => post.id === Number(id));
  if (postIndex === -1) {
    return c.json({ message: "Post not found" }, 404);
  }

  const post = posts[postIndex];
  return c.json({ post });
};

export const getAllPostHandler = (c: Context) => {
  return c.json({ posts });
};
