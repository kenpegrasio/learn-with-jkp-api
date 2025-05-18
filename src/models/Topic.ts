import mongoose from "mongoose";
import './Chapter';

const TopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  attachment: [String],
  chapters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
  }],
}, { timestamps: true });

export default mongoose.model('Topic', TopicSchema);
