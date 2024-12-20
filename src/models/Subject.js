import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  description: { type: String },
});

export default mongoose.model("Subject", subjectSchema);
