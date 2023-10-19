import { Avatar, Button, List } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";
function CommentDetail({ comments, handleDelete, currentUserId }) {
  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
      itemLayout="horizontal"
      renderItem={(item) => (
        <>
          <List.Item
            extra={
              item.user_id === currentUserId && (
                <Button onClick={() => handleDelete(item)}>삭제</Button>
              )
            }
          >
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={item.nickname}
              description={item.description}
            />
            <div style={{ margin: "0 10px" }}>
              {moment(item.createdAt).fromNow()}
            </div>
          </List.Item>
        </>
      )}
    />
  );
}

export default CommentDetail;
