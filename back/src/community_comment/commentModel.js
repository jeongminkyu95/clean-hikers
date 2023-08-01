import { CommentModel } from "../community_comment/commentSchema.js";

class Comment {
  static async create({ newComment }) {
    const createdNewComment = await await CommentModel.create(newComment);
    return createdNewComment;
  }

  static async findByPostId({ post_id }) {
    const commentInPost = await CommentModel.find({ post_id: post_id });
    return commentInPost;
  }

  static async findByCommentId({ comment_id }) {
    const comment = await CommentModel.findOne({ comment_id: comment_id });
    return comment;
  }

  static async findAll() {
    const comments = await CommentModel.find({});
    return comments;
  }

  static async update({ comment_id, fieldToUpdate, newValue }) {
    const filter = { comment_id: comment_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedComment = await CommentModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedComment;
  }

  static async deleteByCommentId({ comment_id }) {
    const comment = await CommentModel.deleteOne({
      comment_id: comment_id,
    });
    return comment;
  }
}

export { Comment };
