import { Router } from "express";
import { commentService } from "./commentService.js";
import { loginRequired } from "../middlewares/loginRequired.js";

const commentRouter = Router();

// 댓글 추가
commentRouter.post(
  "/posts/comment",
  loginRequired,
  async function (req, res, next) {
    try {
      const newComment = await commentService.addComment(req.body);

      res.status(201).json(newComment);
    } catch (error) {
      next(error);
    }
  }
);

// 해당 게시글의 댓글 조회
commentRouter.get("/posts/comments/:postId", async function (req, res, next) {
  try {
    const comments = await commentService.getComments(req.params.postId);
    res.status(200).send(comments);
  } catch (error) {
    next(error);
  }
});

// 유저 닉네임 변경시 해당 유저의 댓글들 일괄 수정
commentRouter.put(
  "/posts/comments/byUser/:userId",
  loginRequired,
  async function (req, res, next) {
    try {
      const user_id = req.params.userId;
      const toUpdate = req.body;

      await commentService.setCommentNick({
        user_id,
        toUpdate,
      });

      res.status(204);
    } catch (error) {
      next(error);
    }
  }
);

// 댓글 삭제
commentRouter.delete(
  "/posts/:userId/comments/:commentId/",
  loginRequired,
  async function (req, res, next) {
    try {
      await commentService.deleteComment(req.params.commentId);
      res.status(204);
    } catch (error) {
      next(error);
    }
  }
);

// 게시글 삭제하면서 해당 게시글의 댓글 일괄 삭제
commentRouter.delete("/:postId/comments", async function (req, res, next) {
  try {
    await commentService.deleteAllComments(req.params.postId);
    res.status(204);
  } catch (error) {
    next(error);
  }
});

export { commentRouter };
