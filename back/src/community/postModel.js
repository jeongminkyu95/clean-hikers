import { PostModel } from "./postSchema.js";

class Post {
  // 게시글 생성.
  static async create({ newPost }) {
    const createdNewPost = await PostModel.create(newPost);
    return createdNewPost;
  }

  // user의 게시글 조회.
  static async findByUserId({ user_id }) {
    const user = await PostModel.find({ user_id: user_id });
    return user;
  }

  // 등록된 모든 게시글 조회.
  static async findAll() {
    const posts = await PostModel.find();
    return posts;
  }

  // 모집상태에 따른 게시글 조회.
  static async findByStation({ station }) {
    const posts = await PostModel.find({ station: station });
    return posts;
  }

  // 장소에 따른 게시글 조회
  static async findByLocation({ locationDetail }) {
    const posts = await PostModel.find({ location: locationDetail });
    return posts;
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

    const updatedPost = await PostModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedPost;
  }

  // 게시글 삭제
  static async deleteByPostId({ post_id }) {
    const post = await PostModel.deleteOne({ post_id: post_id });
    return post;
  }
}

export { Post };
