import { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
      index: true,
    },
    post_id: {
      type: String,
      required: true,
      index: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: "제목을 입력해 주세요.",
    },
    description: {
      type: String,
      required: false,
      default: "내용을 입력하세요",
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    location: {
      type: Object,
      required: false,
    },
    participants: [
      {
        type: Object,
      },
    ],
    participantsLimit: {
      type: Number,
    },
    station: {
      type: String,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.index({ createdAt: -1 });
const PostModel = model("Post", PostSchema);

export { PostModel };
