import mongoose from "mongoose";

const userSchem = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const newuser = mongoose.model("newuser", userSchem);
export default newuser;
