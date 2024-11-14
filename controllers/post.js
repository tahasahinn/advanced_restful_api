import { json } from "express";
import PostSchema from "../models/post.js";

export const getPosts = async (req, res) => {
  try {
    const getPosts = await PostSchema.find();
    res.status(200).json({ getPosts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const newPosts = await PostSchema.create(req.body);
    res.status(200).json({ newPosts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const detailPost = async (req, res) => {
  try {
    const { id } = req.params;
    const detailPosts = await PostSchema.findById(id);
    res.status(200).json({ detailPosts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await PostSchema.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ updatedPost });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await PostSchema.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const searchPost = async (req, res) => {
  try {
    const { search, tag } = req.query;
    const title = new RegExp(search, "i");

    const posts = await PostSchema.find({ $or: [title], tag: { $in: tag.split(",") } });

    res.status(200), json({ posts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
