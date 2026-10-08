import mongoose from "mongoose";
const commentschema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    videoid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "videofiles",
      required: true,
    },
    commentbody: { type: String },
    usercommented: { type: String },
    commentedon: { type: Date, default: Date.now },

    // multi-language support
    language: { type: String, default: "en" },
    translations: [
      {
        lang: String,
        text: String,
        cachedAt: Date,
      },
    ],

    // optional public location display (privacy: hidden unless user opts in)
    location: {
      city: String,
      state: String,
      visible: { type: Boolean, default: false },
    },

    // engagement
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],

    // reports flag for review, never auto-delete
    reports: [
      {
        userid: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        reason: String,
        reportedon: { type: Date, default: Date.now },
      },
    ],
    status: {
      type: String,
      enum: ["active", "under_review", "removed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("comment", commentschema);