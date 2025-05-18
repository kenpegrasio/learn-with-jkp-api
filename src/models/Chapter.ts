import mongoose from "mongoose";

const ChapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  attachment: [String],
  topic_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Chapter", ChapterSchema);
