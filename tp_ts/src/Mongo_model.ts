import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  id: Number,
  title: String,
  author: String,
  pages: Number,
  pagesRead: Number,
  status: String,
  price: Number,
  format: String,
  suggestedBy: String,
  finished: Boolean,
});

export const BookModel = mongoose.model("Book", BookSchema);
