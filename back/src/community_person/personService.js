import { User } from "../mongoDB/index.js";
import { postService } from "../community/postService.js";

class personService {
  static async addPerson({ post_id, email }) {
    const posts = await postService.getAPosts({ post_id });

    const toUpdate = posts;

    const people = toUpdate.person;

    let beingPerson = people.find((item) => item.email == email);

    if (beingPerson !== undefined) {
      const idx = people.indexOf(beingPerson);
      people.splice(idx, 1);

      toUpdate.person = people;

      toUpdate.count = people.length;

      if (toUpdate.station == "모집완료") {
        toUpdate.station = "모집중";
        const deletedBeingPerson = await postService.setPost({
          post_id,
          toUpdate,
        });

        return deletedBeingPerson;
      } else {
        const deletedBeingPerson = await postService.setPost({
          post_id,
          toUpdate,
        });

        return deletedBeingPerson;
      }
    } else {
      const newPerson = await User.findByEmail({ email });

      const toUpdate = await postService.getAPosts({ post_id });

      if (parseInt(toUpdate.count) === toUpdate.personnel) {
        const errorMessage = "모집 인원이 마감되었습니다.";
        return { errorMessage };
      } else {
        toUpdate.person.push(newPerson);

        toUpdate.count = toUpdate.person.length;

        const createPostPerson = await postService.setPost({
          post_id,
          toUpdate,
        });

        if (parseInt(toUpdate.count) == toUpdate.personnel) {
          console.log("모집 인원이 마감되었습니다.");

          toUpdate.station = "모집완료";

          const createPostPerson = await postService.setPost({
            post_id,
            toUpdate,
          });

          createPostPerson.errorMessage = null;

          return createPostPerson;
        } else {
          createPostPerson.errorMessage = null;

          return createPostPerson;
        }
      }
    }
  }

  static async getPersons({ post_id }) {
    const post = await postService.getAPosts({ post_id });
    const people = post.person;
    return people;
  }

  static async beingPerson({ post_id, email }) {
    const post = await postService.getAPosts({ post_id });

    const person = post.person;

    const being = person.filter((item) => item.email == email);

    if (being.length) {
      return "1";
    } else {
      return "0";
    }
  }

  // static async beingPerson({ post_id, email, user_id }) {
  //     const post = await postService.getAPosts({ post_id });

  //     if (post.user_id == user_id) {
  //         const errorMessage = "참여하실 수 없습니다.";
  //         return { errorMessage };
  //     } else {
  //         const person = post.person;
  //         const being = person.map((item) => (item.email = email));
  //         if (being.length) {
  //             return "1";
  //         } else {
  //             return "0";
  //         }
  //     }
  // }
}

export { personService };
