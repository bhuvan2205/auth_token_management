import { verifyUser } from "./../middlewares/users";
import { Hono } from "hono";
import {
  createPostHandler,
  deletePostHandler,
  getAllPostHandler,
  getPostHandler,
} from "../controllers/post";

const posts = new Hono().basePath("/api/posts");

posts.get("/:id", verifyUser, getPostHandler);
posts.get("/", verifyUser, getAllPostHandler);
posts.delete("/:id", verifyUser, deletePostHandler);
posts.post("/", verifyUser, createPostHandler);

export default posts;
