import { Hono } from "hono";
import user from "./routes/users";
import posts from "./routes/posts";
import { cors } from "hono/cors";

const app = new Hono();

app.get("/", (c) => {
  const routes = `
    <h1>Welcome to Auth Management</h1>
    <h2>Available Routes</h2>
    <ul style="list-style-type: none;padding: 0;">
        <li style="margin: 10px;">Get User Session <a href="/api/users/session">GET</a></li>
        <li style="margin: 10px;">Create User Session <a href="/api/users/session">POST</a></li>
        <li style="margin: 10px;">Delete User Session <a href="/api/users/session">DELETE</a></li>
        <li style="margin: 10px;">Get User Posts <a href="/api/posts">GET</a></li>
        <li style="margin: 10px;">Create New Post <a href="/api/posts">POST</a></li>
        <li style="margin: 10px;">Get Single Post <a href="/api/posts/:id">GET</a></li>  
        <li style="margin: 10px;">Delete Post <a href="/api/posts/:id">DELETE</a></li>  
    </ul>
  `;
  return c.html(routes);
});

app.use("/api/*", cors());

app.route("/", user);
app.route("/", posts);

export default {
  port: 8000,
  fetch: app.fetch,
};
