import "moment/locale/ko";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ButtonRow,
  CreateRow,
  DetailCol,
} from "../styledComponents/CommunityDetailStyled";

import { EnvironmentOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import { NonIconBlueBtn } from "../../common/button/NonIconBtn";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import CommentList from "./CommentList";
import * as api from "../../../api/api";
import moment from "moment";
import { ROUTES } from "../../../enum/routes";

function CommunityDetail({}) {
  const mapRef = useRef();
  const navigate = useNavigate();
  const [datas, setDatas] = useState("");
  const [location, setLocation] = useState({});
  const [currentUserData, setCurrentUserData] = useState("");
  const [textState, setTextState] = useState("참여신청");

  const { no } = useParams();

  const [style, setStyle] = useState({
    width: "100%",
    height: "250px",
    margin: "0px auto",
  });

  const [latitude, setLatitude] = useState(35.86125);
  const [longitude, setLongitude] = useState(127.746131);

  const cardDecription = () => {
    let visitDate = moment(datas.visitDate);
    visitDate = visitDate.format("YYYY년 MM월 DD일");

    return datas.station === "클린후기" ? (
      <p>
        {visitDate} <br />
        {datas.participantsLimit}명과 함께했어요!
      </p>
    ) : (
      <p>
        {visitDate} <br />
        모집인원 : {datas.participantsLimit} <br />
        신청인원 : {datas.participants?.length || 0}
      </p>
    );
  };

  const getCommunityDetaildata = useCallback(async () => {
    try {
      const res = await api.get(`community/postsDetail/${no}`);
      setDatas(res.data);
      setLocation(res.data.location);

      // 참가자 배열에 현재 유저가 담겨있는지 체크
      const isParticipant = res.data.participants.some(
        (participant) => participant.id === currentUserData.id
      );

      // 참여 버튼 상태 설정
      const buttonStation = () => {
        if (
          res.data.station === "클린후기" ||
          res.data.user_id === currentUserData.id
        ) {
          // 클린후기 - 버튼 x
          // 게시글 작성자 본인인 경우 - 버튼 x
          return "non";
        } else if (res.data.station === "모집완료") {
          // 모집 완료인데 참가자인가 - 참여취소
          // 모집 완료인데 참가자가 아닌가 - 모집완료
          return isParticipant ? "참여취소" : "모집완료";
        } else {
          // 모집 중인데 참가자인가 - 참여 취소
          // 모집 중인데 참가자가 아닌가 - 참여신청
          return isParticipant ? "참여취소" : "참여신청";
        }
      };

      setTextState(buttonStation);
    } catch (res) {
      console.log(res);
    }
  }, [no, currentUserData.id]);

  useEffect(() => {
    const map = mapRef.current;
    if (map) map.relayout();
  }, [style]);

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

  // 게시글 삭제하기
  const handleDelete = async function () {
    if (window.confirm("해당 게시물을 삭제하시겠습니까?")) {
      await api.delete(`community/posts/${no}`);
      alert("삭제가 완료되었습니다.");
      return navigate(-1);
    }
  };

  //게시글(모임)에 참석하기
  const handleApply = async function () {
    if (window.confirm(`${textState} 하시겠습니까?`)) {
      try {
        await api.post(`community/posts/${no}/participants`, {
          post_id: no,
          email: currentUserData.email,
        });

        alert(`${textState} 완료되었습니다.`);
        getCommunityDetaildata();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const postTime = moment(datas.createdAt).fromNow(); // post 작성 시간

  useEffect(() => {
    getCommunityDetaildata();
  }, [getCommunityDetaildata]);

  useEffect(() => {
    setLatitude(location.latitude);
    setLongitude(location.longitude);
  }, [location]);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      setLatitude(location.latitude);
      setLongitude(location.longitude);

      const map = mapRef.current;
      if (map) map.relayout();
    }
  }, [location]);

  return (
    <>
      <CreateRow justify="center">
        <DetailCol>
          {currentUserData.id === datas.user_id && (
            <Col>
              <Button
                onClick={() => {
                  handleDelete();
                }}
              >
                삭제
              </Button>
              <Link to={`/community/communityDetail/communityEdit/${no}`}>
                <Button>수정</Button>
              </Link>
            </Col>
          )}
          <Row>
            <Col span={10}>
              <div className="community-detail-main">
                <h1>{datas.title}</h1>
                <p>{postTime}</p>
                <b>
                  {<Avatar size="small" icon={<UserOutlined />} />}
                  {datas.nickname}
                </b>
                <p>
                  {<EnvironmentOutlined />} {location.name} | {location.address}
                </p>
                <p className="community-detail-discription">
                  {datas.description}
                </p>
              </div>
            </Col>
            <Col span={14} push={2}>
              <Row justify="end">
                <Card
                  style={{
                    width: 360,
                  }}
                  cover={
                    <>
                      {latitude && longitude && (
                        <Map
                          center={{
                            lat: latitude,
                            lng: longitude,
                          }}
                          style={style}
                          level={8}
                          ref={mapRef}
                        >
                          <MapMarker
                            position={{
                              lat: latitude,
                              lng: longitude,
                            }}
                          />
                        </Map>
                      )}
                      {/* <Map
                        center={{
                          lat: latitude,
                          lng: longitude,
                        }}
                        style={style}
                        level={8}
                        ref={mapRef}
                      >
                        <MapMarker
                          position={{
                            lat: latitude,
                            lng: longitude,
                          }}
                        />
                      </Map> */}
                    </>
                  }
                >
                  <Meta
                    title={
                      <p>
                        {<EnvironmentOutlined />}
                        {location.name} | {location.address}
                      </p>
                    }
                    description={cardDecription()}
                  />
                </Card>
              </Row>
              <ButtonRow justify="end">
                {currentUserData === "" ? (
                  <NonIconBlueBtn
                    text="참여하려면 로그인하세요."
                    onClick={() => navigate(ROUTES.USER.LOGIN)}
                  />
                ) : textState === "non" ? null : textState === "모집완료" ? (
                  <NonIconBlueBtn text={textState} disabled={true} />
                ) : (
                  <NonIconBlueBtn
                    onClick={() => {
                      handleApply();
                    }}
                    text={textState}
                  />
                )}
              </ButtonRow>
            </Col>
          </Row>
          <CommentList currentUserData={currentUserData} datas={datas} />
        </DetailCol>
      </CreateRow>
    </>
  );
}

export default CommunityDetail;
