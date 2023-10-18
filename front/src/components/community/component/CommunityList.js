import { Pagination } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RecruitBlueBtn } from "../../common/button/IconBtn";

import {
  CommunityListCol,
  RecruitBlueBtnAlign,
} from "../styledComponents/CommunityListStyled";

import CommunityNav from "./CommunityNav";
const PaginationWrapper = styled(Pagination)`
  /* Display & Box Model */
  display: block;
  text-align: center;
  padding-top: 15px;

  .ant-pagination-item-active a {
    color: #89a550;
    border: none;
  }
  .ant-pagination-item-active {
    border: none;
    text-decoration: underline 2px;
  }
`;
function CommunityList({
  posts,
  currentUserData,
  setPageNum,
  pageNum,
  setStation,
  totalPage,
}) {
  return (
    <div>
      <CommunityListCol>
        {currentUserData.id && (
          <RecruitBlueBtnAlign>
            <Link to="communityCreate">
              <RecruitBlueBtn />
            </Link>
          </RecruitBlueBtnAlign>
        )}
        <CommunityNav
          posts={posts}
          setPageNum={setPageNum}
          onChange={(e) => setStation(e)}
        />
        <PaginationWrapper
          current={pageNum}
          defaultCurrent={1}
          total={totalPage * 5}
          defaultPageSize={5}
          size="small"
          showSizeChanger={false}
          onChange={(e) => setPageNum(e)}
        />
      </CommunityListCol>
    </div>
  );
}

export default CommunityList;
