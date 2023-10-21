import { CommentModel } from "../community_comment/commentSchema.js";

class Comment {
  // 댓글 생성
  static async create(newComment) {
    return await CommentModel.create(newComment);
  }

  // 특정 게시글 댓글 조회
  static async findByPostId(post_id) {
    return await CommentModel.find({ post_id: post_id });
  }

  // 댓글의 작성자 닉네임 일괄 수정
  static async updateMany({ user_id, toUpdate }) {
    return await CommentModel.updateMany({ user_id: user_id }, toUpdate);
  }

  // 댓글 삭제
  static async deleteByCommentId(comment_id) {
    return await CommentModel.deleteOne({
      comment_id: comment_id,
    });
  }

  // 댓글 일괄 삭제
  static async deleteAllCommentsByPostId(post_id) {
    return await CommentModel.deleteMany({
      post_id: post_id,
    });
  }
}

export { Comment };
