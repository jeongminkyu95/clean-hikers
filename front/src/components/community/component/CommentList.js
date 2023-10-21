import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { CommunityCommentList } from "../styledComponents/CommunityDetailStyled";
import CommentDetail from "./CommentDetail";
import CommentEdit from "./CommentEdit";
import * as api from "../../../api/api";

function CommentList({ currentUserData, datas }) {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const newComments = [...comments];

  const currentUserId = currentUserData.id;

  useEffect(() => {
    async function getCommentData() {
      try {
        await api
          .get(`community/posts/comments`, `${datas.post_id}`)
          .then((res) => setComments(res.data));
      } catch (res) {
        console.log(res);
      }
    }
    getCommentData();
  }, [datas]);

  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);

    setTimeout(async () => {
      setSubmitting(false);
      let res = await api.post(`community/posts/comment`, {
        user_id: currentUserData.id,
        post_id: datas.post_id,
        description: value,
        nickname: currentUserData.nickname,
      });

      newComments.push(res.data);
      setValue("");
      setComments([
        ...comments,
        {
          author: currentUserData.nickname,
          avatar: currentUserData.defaultImage,
          content: <p>{value}</p>,
        },
      ]);
      setComments(newComments);
    }, 500);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleDelete = function (item) {
    if (window.confirm("해당 댓글을 삭제하시겠습니까?")) {
      console.log(item);
      api.delete(`community/posts/comments`, `${item.comment_id}`);
      setComments(
        comments.filter((comment) => comment.comment_id !== item.comment_id)
      );
      setValue("");
    }
  };
  return (
    <>
      {comments.length > 0 && (
        <CommentDetail
          comments={newComments}
          handleDelete={handleDelete}
          currentUserId={currentUserId}
        />
      )}
      {currentUserData.id && (
        <CommunityCommentList
          avatar={
            <Avatar src={currentUserData.defaultImage} alt="user Image" />
          }
          content={
            <CommentEdit
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      )}
    </>
  );
}

export default CommentList;
