import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: {
      validator(v: string) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: (props: { value: string }) => `${props.value} is not a valid email address!`,
    },
  },
  google_id: { type: Number, unique: true, required: true },
  picture: { type: String, required: true },
  point: { type: Number },
  accesstype: { type: String },
});

export default mongoose.model("User", userSchema);
