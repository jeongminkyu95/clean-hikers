import { v4 } from "uuid";
import { Comment } from "../mongoDB/index.js";
import { postService } from "../community/postService.js";

class commentService {
  static async addComment({ post_id, user_id, nickname, title, description }) {
    const comment_id = v4();

    const newComment = {
      comment_id,
      post_id,
      user_id,
      nickname,
      title,
      description,
    };

    const createdNewComment = await Comment.create({ newComment });

    // createdNewComment.errorMessage = null;

    return createdNewComment;
  }

  static async getComments({ post_id }) {
    const comments = await Comment.findByPostId({ post_id });
    return comments;
  }

  static async pushComments({ toUpdate, newComment }) {
    toUpdate.comment.push(newComment);

    return toUpdate;
  }

  static async setComment({ comment_id, toUpdate }) {
    let comment = await Comment.findByCommentId({ comment_id });

    if (!comment) {
      const errorMessage = "내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.nickname) {
      comment = await Comment.update({
        comment_id,
        fieldToUpdate: "nickname",
        newValue: toUpdate.nickname,
      });
    }

    if (toUpdate.title) {
      comment = await Comment.update({
        comment_id,
        fieldToUpdate: "title",
        newValue: toUpdate.title,
      });
    }

    if (toUpdate.description) {
      comment = await Comment.update({
        comment_id,
        fieldToUpdate: "description",
        newValue: toUpdate.description,
      });
    }

    const post_id = comment.post_id;

    const twoUpdate = await postService.getAPosts({ post_id });

    const newComment = twoUpdate.comment;

    let beingcomment = newComment.find((item) => item.comment_id == comment_id);

    const idx = newComment.indexOf(beingcomment);

    newComment.splice(idx, 1, comment);

    twoUpdate.comment = newComment;

    const createPostComment = await postService.setPost({
      post_id,
      toUpdate: twoUpdate,
    });

    return newComment;
  }

  static async deleteComment({ comment_id }) {
    let comments = await Comment.findByCommentId({ comment_id });

    if (!comments) {
      const errorMessage = "내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const post_id = comments.post_id;

    comments = await Comment.deleteByCommentId({ comment_id });

    const newComments = await Comment.findByPostId({ post_id });

    const twoUpdate = await postService.getAPosts({ post_id });

    twoUpdate.comment = newComments;

    const createPostComment = await postService.setPost({
      post_id,
      toUpdate: twoUpdate,
    });

    return newComments;
  }
}

export { commentService };
