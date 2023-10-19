// 페이지네이션 게시글, totalPage 계산
export function paginateAndTotalPage(posts, page, perPage) {
  // 불러온 게시글들 시간 순서대로 내림차순 정렬
  const postsList = posts.sort((a, b) => {
    if (a.createdAt > b.createdAt) {
      return -1;
    }
  });

  // 게시글 페이지네이션 처리
  const paginatedPosts = postsList.slice(perPage * (page - 1), perPage * page);
  const totalPage = Math.ceil(posts.length / perPage);
  return { paginatedPosts, totalPage };
}
