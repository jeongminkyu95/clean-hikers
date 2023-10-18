import { Row } from "antd";
import React from "react";
import {
  CommunityNavStyled,
  CommunityNavCol,
} from "../styledComponents/CommunityNavStyled";
import CommunityItem from "./CommunityItem";

const tabList = [
  {
    key: "allPosts",
    tab: "전체",
  },
  {
    key: "클린후기",
    tab: "클린후기",
  },
  {
    key: "모집중",
    tab: "모집중",
  },
  {
    key: "모집완료",
    tab: "모집완료",
  },
];

function CommunityNav({ posts, onChange, setPageNum }) {
  const content = (
    <p>
      {posts.map((post) => (
        <CommunityItem key={post.no} post={post} />
      ))}
    </p>
  );

  return (
    <>
      <Row justify="center">
        <CommunityNavCol>
          <CommunityNavStyled
            style={{
              width: "100%",
            }}
            tabList={tabList}
            activeTabKey={tabList}
            onTabChange={(key) => {
              onChange(key);
              setPageNum(1);
            }}
          >
            {content}
          </CommunityNavStyled>
        </CommunityNavCol>
      </Row>
    </>
  );
}

export default CommunityNav;
