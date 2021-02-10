import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../../interfaces/IUser";

const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

UserSchema.method("toJSON", function () {
  const { _id, __v, password, ...user } = this.toObject();
  user.id = _id;
  return user;
});

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<Boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>("User", UserSchema);
