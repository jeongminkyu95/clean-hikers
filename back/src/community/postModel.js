import { PostModel } from "./postSchema.js";

class Post {
  // 게시글 생성.
  static async create({ newPost }) {
    return await PostModel.create(newPost);
  }

  // user의 게시글 조회.
  static async findByUserId({ user_id }) {
    return await PostModel.find({ user_id: user_id });
  }

  // 등록된 모든 게시글 조회.
  static async findAll() {
    return await PostModel.find();
  }

  // 모집상태에 따른 게시글 조회.
  static async findByStation({ station }) {
    return await PostModel.find({ station: station });
  }

  // 장소에 따른 게시글 조회
  static async findByLocation({ locationDetail }) {
    return await PostModel.find({ location: locationDetail });
  }

  // 특정 게시글 조회
  static async findByPostId({ post_id }) {
    const post = await PostModel.findOne({ post_id });

    if (!post) {
      throw new Error("게시글이 존재하지 않습니다.");
    }
    return post;
  }

  // 게시글 수정
  static async update({ post_id, fieldToUpdate, newValue }) {
    const filter = { post_id: post_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    return await PostModel.findOneAndUpdate(filter, update, option);
  }

  // 게시글 삭제
  static async deleteByPostId({ post_id }) {
    const post = await PostModel.deleteOne({ post_id: post_id });

    if (post.deletedCount === 0) {
      throw new Error("해당 게시글을 삭제할 수 없습니다.");
    }
    return post;
  }
}

export { Post };
