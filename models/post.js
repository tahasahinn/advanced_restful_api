import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("post", postSchema);
