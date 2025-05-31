import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import "./Chapter";

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  accesstype: string;
  point: number;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  completed_chapters: Types.ObjectId[];
  favourite_chapters: Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid email address!`,
    },
  },
  accesstype: { type: String },
  point: { type: Number },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(v);
      },
      message: () =>
        `Password must be at least 8 characters long, contain at least one capital letter and one special character.`,
    },
  },
  completed_chapters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
    },
  ],
  favourite_chapters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
    },
  ],
});

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
