import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unqiue: true,
  },
  password: { type: String, required: true },
});

// To convert mongoose data to JSON
adminSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
};
const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
