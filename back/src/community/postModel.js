import { PostModel } from "./postSchema.js";

class Post {
  // 게시글 생성.
  static async create(newPost) {
    return await PostModel.create(newPost);
  }

  // user의 게시글 조회.
  static async findByUserId({ user_id }) {
    return await PostModel.find({ user_id: user_id }).select(
      "post_id nickname title description location station createdAt"
    );
  }

  // 등록된 모든 게시글 조회.
  static async findAll() {
    return await PostModel.find().select(
      "post_id nickname title description location station createdAt"
    );
  }

  // 모집상태에 따른 게시글 조회.
  static async findByStation({ station }) {
    return await PostModel.find({ station: station }).select(
      "post_id nickname title description location station createdAt"
    );
  }

  // 특정 게시글 상세 조회
  static async findByPostId(post_id) {
    const post = await PostModel.findOne({ post_id: post_id });

    if (!post) {
      throw new Error("게시글이 존재하지 않습니다.");
    }
    return post;
  }

  // 게시글 수정
  static async update({ post_id, toUpdate }) {
    const filter = { post_id: post_id };
    const option = { returnOriginal: false };

    return await PostModel.findOneAndUpdate(filter, toUpdate, option);
  }

  // 게시글의 유저 닉네임 일괄 수정
  static async updateMany({ user_id, toUpdate }) {
    return await PostModel.updateMany({ user_id: user_id }, toUpdate);
  }

  // 참가자 추가.
  static async addParticipant({ post_id, userObject }) {
    const newPost = await PostModel.findOneAndUpdate(
      { post_id: post_id },
      {
        $push: {
          participants: userObject,
        },
      },
      { new: true }
    ).select("participants participantsLimit");

    if (newPost.participants.length == newPost.participantsLimit) {
      return await PostModel.updateOne(
        { post_id: post_id },
        { station: "모집완료" }
      );
    }
    return newPost;
  }

  // 참가자 제거.
  static async deleteParticipant({ post_id, user_id }) {
    const newPost = await PostModel.findOneAndUpdate(
      { post_id: post_id },
      {
        $pull: {
          participants: { id: user_id },
        },
      },
      { new: true }
    ).select("station");
    if (newPost.station == "모집완료") {
      return await PostModel.updateOne(
        { post_id: post_id },
        { station: "모집중" }
      );
    }
    return newPost;
  }

  // 게시글 삭제
  static async deleteByPostId({ post_id, user_id }) {
    const post = await PostModel.deleteOne({
      post_id: post_id,
      user_id: user_id,
    });

    if (post.deletedCount === 0) {
      throw new Error("해당 게시글을 삭제할 수 없습니다.");
    }
    return post;
  }
}

export { Post };
