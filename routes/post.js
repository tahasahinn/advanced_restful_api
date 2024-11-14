import express from "express";
import {
  createPost,
  deletePost,
  detailPost,
  getPosts,
  searchPost,
  updatePost,
} from "../controllers/post.js";
import auth from "../models/auth.js";

const router = express.Router();
router.get("/searchPost", searchPost);
router.get("/getPosts", getPosts);
router.post("/createPost", auth, createPost);
router.get("/detailPost/:id", detailPost);
router.patch("/updatePost/:id", auth, updatePost);
router.delete("/deletePost/:id", auth, deletePost);

export default router;
