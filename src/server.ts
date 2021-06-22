import express from "express";
import "reflect-metadata";
import { router } from "./routes";

const PORT = 3000;

import "./database";

const app = express();

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
