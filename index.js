import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import Auth from "./routes/auth.js";
import Post from "./routes/post.js";

const app = express();
app.use(cors());
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/auth", Auth);
app.use("/post", Post);

const PORT = process.env.PORT || 5000;

db();
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
