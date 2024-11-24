import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  resource: { type: String, required: true },
  description: { type: String },
  subject_id: { type: String, required: true },
});

export default mongoose.model("Material", materialSchema);
