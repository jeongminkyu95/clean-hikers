import { Post, Mountain } from "../mongoDB/index.js";
import { v4 } from "uuid";
import { throwErrorIfDataExists } from "../utils/throwErrorIfDataExists.js";
import { PostNotFoundError } from "../utils/CustomError.js";

class postService {
  // 게시글 생성
  static async addPost(newPost) {
    // 입력된 산으로 해당 산의 디테일 정보 조회.
    const [locationDetail] = await Mountain.findData(newPost.location);

    // 입력된 산의 이름과 조회한 산의 이름이 다른 경우 에러.
    throwErrorIfDataExists(
      newPost.location !== locationDetail.name,
      Error,
      `선택하신 산(${newPost.location})과 조회된 산(${locationDetail.name})의 정보가 일치하지 않습니다.`
    );

    newPost.location = locationDetail;
    newPost.post_id = v4();

    const post = await Post.create(newPost);

    // 생성된 게시글이 존재하지 않다면 에러
    throwErrorIfDataExists(!post, PostNotFoundError);

    return post;
  }

  // 마이페이지 작성 게시글 조회 (페이지네이션 5개씩)
  static async getUserPosts({ user_id, page, perPage }) {
    // 유저의 작성 게시글들 조회 후 페이지네이션 적용
    const query = { user_id };
    const paginatedPosts = await Post.findAndPaginatePostsByQuery({
      query,
      page,
      perPage,
    });
    const totalPostsCount = await Post.countByStation({ query });
    const totalPage = Math.ceil(totalPostsCount / perPage);

    return { paginatedPosts, totalPage };
  }

  // 특정 게시글 조회
  static async getPostDetail(post_id) {
    return await Post.findByPostId(post_id);
  }

  // 상태별 게시글 조회 5개씩
  static async getAllPosts({ station, page, perPage }) {
    // 'station' 파라미터에 따라 모든 게시물 또는 특정 상태의 게시물을 조회하고 페이지네이션 적용
    let query;
    if (station == "allPosts") {
      query = {};
    } else {
      query = { station };
    }
    const paginatedPosts = await Post.findAndPaginatePostsByQuery({
      query,
      page,
      perPage,
    });
    const totalPostsCount = await Post.countByStation({ query });
    const totalPage = Math.ceil(totalPostsCount / perPage);

    return { paginatedPosts, totalPage };
  }

  // 게시글 수정
  static async setPost({ post_id, toUpdate }) {
    // 변경된 필드만 업데이트하기 위해 기존 데이터와 비교 후 필요한 부분만 업데이트
    let post = await Post.findByPostId(post_id);

    for (const field in toUpdate) {
      if (
        post[field].trim() !== toUpdate[field].trim() &&
        toUpdate[field].trim() !== ""
      ) {
        toUpdate[field] = toUpdate[field].trim();
      } else {
        delete toUpdate[field];
      }
    }
    // 값이 변경된 필드가 없다면 수정 없이 기존 값 그대로 return.
    if (toUpdate.length === 0) {
      return post;
    } else {
      post = await Post.update({ post_id, toUpdate });
      return post;
    }
  }

  // // 게시글 작성자 닉네임 변경
  static async changeNicknamePost({ user_id, toUpdate }) {
    await Post.updateMany({
      user_id,
      toUpdate,
    });

    return { message: "업데이트 성공" };
  }

  // 게시글 삭제
  static async deletePost({ post_id, user_id }) {
    const posts = await Post.deleteByPostId({ post_id, user_id });

    return posts;
  }
}

export { postService };
