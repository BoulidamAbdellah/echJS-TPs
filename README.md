```markdown
# echJS-TPs

This repository contains two small exercise projects (TPs) implemented with JavaScript/TypeScript. Each project is in its own folder and focuses on a different topic: a small Express-based web app and a TypeScript exercise project.

---

## Projects at a glance

### 1) tp2_express
What it is:
- A small Express.js web application for simple book management with a basic authentication flow.
- Uses MongoDB (via Mongoose) for user data, Pug for server-side templates, and Tailwind/PostCSS for styling.

What it does:
- Connects to a local MongoDB database named `Books_management`.
- Defines a `Users` model (email and password).
- Provides a login page (rendered with Pug) at `/` and a protected books page at `/book`.
- Uses express-session for session-based authentication; successful login sets `req.session.authentified` and redirects to `/book`.
- Serves a small list of sample books (hard-coded in `server.js`) for demonstration.

Key files:
- tp2_express/server.js — Express server, MongoDB connection, routes and auth logic.
- tp2_express/package.json — dependencies and project metadata (includes express, mongoose, pug, tailwindcss, postcss-cli, etc.).
- tp2_express/views/ — Pug templates (login/authentication and books views).
- tp2_express/tailwind.config.js, tp2_express/postcss.js — Tailwind and PostCSS configuration.

Notable package.json dependencies:
- express
- express-session
- mongoose
- pug
- tailwindcss
- postcss-cli
- @tailwindcss/cli
- autoprefixer (dev)
- postcss (dev)

Run / setup notes:
1. Ensure you have Node.js and npm installed.
2. Ensure MongoDB is running locally (the server currently connects to `mongodb://localhost:27017/Books_management`).
3. In the tp2_express folder:
   - Install dependencies: `npm install`
   - Start the server: `node server.js` (the app logs that it runs on port 8080).
4. Open a browser to http://localhost:8080 to view the login page, then log in with a user existing in the `Users` collection (you can insert a user directly into MongoDB for testing).

Port: the server uses port 8080 (configured in `server.js`).

---

### 2) tp_ts
What it is:
- A TypeScript-based exercise project folder (tp_ts). This folder contains TypeScript source(s) and configuration for learning/experimenting with TypeScript features and tooling.

What it does:
- Implements TypeScript exercises / sample code. (The exact tasks and scripts live inside the tp_ts folder — look there for the project-specific README, package.json, tsconfig.json, and `src/` files if present.)

Typical structure and run notes (what to check inside tp_ts):
- Look for `package.json` for available scripts (build, start, dev, test).
- Look for `tsconfig.json` for TypeScript compiler settings.
- If `src/` exists, run `npm install` then:
  - Build: `npm run build` or `npx tsc`
  - Run (if compiled): `npm start` or `node dist/...`
  - For development, there may be `npm run dev` using ts-node-dev/nodemon

---

## Common prerequisites
- Node.js (LTS recommended)
- npm (or yarn)
- For tp2_express: a running MongoDB instance (local or remote; update the connection string in server.js if needed)

---

## Contributing
- Fork the repository and create a branch for your change.
- Add or update tests if present, run the project locally to verify changes.
- Open a pull request describing your changes.

---

```
```
