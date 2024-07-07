import { Hono } from "hono";
import user from "./routes/users";
import posts from "./routes/posts";

const app = new Hono();

app.get("/", (c) => {
  const routes = `
    <h1>Welcome to Auth Management</h1>
    <h2>Available Routes</h2>
    <ul style="list-style-type: none;padding: 0;">
        <li style="margin: 10px;">Get User Session <a href="/api/users/session">GET</a></li>
        <li style="margin: 10px;">Create User Session <a href="/api/users/session">POST</a></li>
        <li style="margin: 10px;">Delete User Session <a href="/api/users/session">DELETE</a></li>
    </ul>
  `;
  return c.html(routes);
});

app.route("/", user);
app.route("/", posts);

export default {
  port: 8000,
  fetch: app.fetch,
};
