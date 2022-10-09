/* 국립공원 리스트 */
import { useState } from "react";
import styled from "styled-components";
import MountainDetail from "./MountainDetail.js";

const List = styled.div`
  /* Display & Box Model */
  display: grid;
  grid-template-columns: 40% 40% 20%;
  width: 800px;
  height: 50px;
  padding: 0px 30px;
  border: 1px solid rgb(220, 220, 220);
  border-radius: 10px;
  margin: 0 auto;
  margin-bottom: 15px;

  /* Text */
  line-height: 50px;
  text-align: start;

  /* Other */
  cursor: pointer;
  transition-property: border, box-shadow; // 호버 시 테두리색 변경을 위한 코드
  transition-duration: 0.3s; // 호버 시 테두리색 변경을 위한 코드

  :hover {
    transition-property: border; // 호버 시 테두리색 변경을 위한 코드
    transition-duration: 0.3s; // 호버 시 테두리색 변경을 위한 코드
    border: 1px solid rgb(0, 130, 30);
    box-shadow: 1px 1px 2px 0px rgba(150, 150, 150, 0.8);
  }
`;

function MountainList({ MOUNTAIN, isModal, setIsModal, value, setValue }) {
  return (
    <div>
      {MOUNTAIN.map((v, index) => {
        return (
          <div key={index}>
            <List
              onClick={() => {
                setIsModal(true);
                setValue(v);
              }}
            >
              <div>
                <b>{v.name}</b>
              </div>
              <div style={{ textAlign: "start" }}>{v.location}</div>
              <div style={{ textAlign: "end" }}>
                <b>난이도</b> {v.level}
              </div>
            </List>
          </div>
        );
      })}
      {isModal ? <MountainDetail setIsModal={setIsModal} value={value} /> : <></>}
    </div>
  );
}
export default MountainList;
