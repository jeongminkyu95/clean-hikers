import React, { useEffect, useState } from "react";
import CommunityList from "../components/community/component/CommunityList";
import * as api from "../api/api";
function CommunityPage() {
  const [posts, setPosts] = useState([]);
  const [currentUserData, setCurrentUserData] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [station, setStation] = useState("allPosts");
  const [totalPage, setToTalPage] = useState(0);

  useEffect(() => {
    async function getUserData() {
      try {
        const { data: currentUser } = await api.get("user/user-page");
        setCurrentUserData(currentUser);
      } catch (e) {
        console.error(e);
      }
    }
    getUserData();
  }, []);

  useEffect(() => {
    async function getCommunityData() {
      try {
        const res = await api.get(
          `community/postlist`,
          `?station=${station}&page=${pageNum}&perPage=${5}`
        );

        setPosts(res.data.paginatedPosts);
        setToTalPage(res.data.totalPage);
      } catch (e) {
        console.log(e);
      }
    }
    setPosts([]);
    getCommunityData();
  }, [station, pageNum]);

  return (
    <>
      <CommunityList
        posts={posts}
        setPosts={setPosts}
        setPageNum={setPageNum}
        pageNum={pageNum}
        station={station}
        totalPage={totalPage}
        setStation={setStation}
        currentUserData={currentUserData}
      />
    </>
  );
}

export default CommunityPage;
