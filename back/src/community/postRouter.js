import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";
import { NotLoginUser } from "../utils/CustomError.js";
import { postService } from "./postService.js";
import { throwIfNoData } from "../utils/throwIfNoData.js";

const postRouter = Router();

// 게시글 추가
postRouter.post("/post", loginRequired, async function (req, res, next) {
  try {
    const newPost = await postService.addPost(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
});

// 마이페이지 작성 게시글 조회 (페이지네이션 5개씩)
postRouter.get(
  "/posts/:userId",
  loginRequired,
  async function (req, res, next) {
    try {
      const user_id = req.params.userId;
      const pagination = req.query;

      // 사용자의 모든 게시물을 조회하고 페이지네이션 적용
      const posts = await postService.getUserPosts({
        user_id,
        pagination,
      });

      res.status(200).send(posts);
    } catch (error) {
      next(error);
    }
  }
);

//모든 게시글 조회 (station별로 5개씩 출력)
postRouter.get("/postlist", async function (req, res, next) {
  try {
    const { page, perPage, station } = req.query;

    // 지정된 station에 따라 모든 게시물을 조회하고 페이지네이션 적용
    const postList = await postService.getAllPosts({ page, perPage, station });
    res.status(200).send(postList);
  } catch (error) {
    next(error);
  }
});

//특정 게시글 상세 조회
postRouter.get("/postsDetail/:postId", async function (req, res, next) {
  try {
    const posts = await postService.getPostDetail(req.params.postId);

    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
});

//게시글 수정
postRouter.put(
  "/posts/:postId",
  loginRequired,
  async function (req, res, next) {
    try {
      const post_id = req.params.postId;
      const toUpdate = req.body;

      const updatedPost = await postService.setPost({
        post_id,
        toUpdate,
      });

      res.status(200).json(updatedPost);
    } catch (error) {
      next(error);
    }
  }
);

//유저 닉네임 수정시 게시글 작성자 닉네임 수정
postRouter.put(
  "/posts/byUser/:userId",
  loginRequired,
  async function (req, res, next) {
    try {
      const user_id = req.params.userId;
      const toUpdate = req.body;

      // 사용자의 닉네임 변경 후 그에 따라 해당 사용자가 작성한 모든 게시물의 닉네임도 업데이트함.
      await postService.changeNicknamePost({
        user_id,
        toUpdate,
      });

      res.status(200).send("ok");
    } catch (error) {
      next(error);
    }
  }
);

// 게시글 삭제
postRouter.delete(
  "/posts/:postId",
  loginRequired,
  async function (req, res, next) {
    try {
      const post_id = req.params.postId;
      const user_id = req.loginedUser.id;

      await postService.deletePost({ post_id, user_id });

      res.send("삭제가 완료되었습니다.");
    } catch (error) {
      next(error);
    }
  }
);

export { postRouter };
