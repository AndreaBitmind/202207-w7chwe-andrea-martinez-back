import { model, Schema } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },

  image: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema, "users");

export default User;
