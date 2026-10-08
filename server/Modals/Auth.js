import mongoose from "mongoose";
const userschema = mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String },
  channelname: { type: String },
  description: { type: String },
  image: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  plan: { type: String, enum: ["free", "bronze", "silver", "gold"], default: "free" },
  planExpiresAt: { type: Date },
  joinedon: { type: Date, default: Date.now },
});
export default mongoose.model("user", userschema);