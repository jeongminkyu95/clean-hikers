import { CommentModel } from "../community_comment/commentSchema.js";

class Comment {
  static async create({ newComment }) {
    return await CommentModel.create(newComment);
  }

  static async findByPostId({ post_id }) {
    return await CommentModel.find({ post_id: post_id });
  }

  static async findByCommentId({ comment_id }) {
    const comment = await CommentModel.findOne({ comment_id: comment_id });

    if (!comment) {
      throw new Error("댓글이 존재하지 않습니다.");
    }

    return comment;
  }

  static async findAll() {
    return await CommentModel.find({});
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

    if (comment.deletedCount === 0) {
      throw new Error("해당 댓글을 삭제할 수 없습니다.");
    }

    return comment;
  }
}

export { Comment };
