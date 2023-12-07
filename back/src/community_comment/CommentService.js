import { v4 } from "uuid";
import { Comment } from "../mongoDB/index.js";

class CommentService {
  // 댓글 생성
  static async addComment({ post_id, user_id, nickname, description }) {
    const comment_id = v4();

    const newComment = {
      comment_id,
      post_id,
      user_id,
      nickname,
      description,
    };

    const createdNewComment = await Comment.create(newComment);
    return createdNewComment;
  }

  // 해당 게시글의 댓글 조회
  static async getComments(post_id) {
    const comments = await Comment.findByPostId(post_id);
    return comments;
  }

  // 댓글 작성자 닉네임 변경
  static async setCommentNick({ user_id, toUpdate }) {
    return await Comment.updateMany({ user_id, toUpdate });
  }

  // 댓글 삭제
  static async deleteComment(comment_id) {
    return await Comment.deleteByCommentId(comment_id);
  }

  // 댓글 일괄 삭제
  static async deleteAllComments(post_id) {
    return await Comment.deleteAllCommentsByPostId(post_id);
  }
}

export { CommentService };
