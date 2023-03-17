import mongoose from "mongoose";

const partySchema = new mongoose.Schema({
  vote: {
    type: Number,
    required: true,
    unqiue: true,
  },
  name: { type: String, required: true },
});

// To convert mongoose data to JSON
partySchema.options.toJSON = {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
};
const Party = mongoose.model("Party", partySchema);
export default Party;
