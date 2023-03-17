import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  addharNumber: {
    type: Number,
    required: true,
    unqiue: true,
  },
  name: { type: String, required: true },
});

// To convert mongoose data to JSON
userSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
};
const User = mongoose.model("User", userSchema);
export default User;
