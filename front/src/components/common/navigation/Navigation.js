import React, { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { theme } from "../styles/palette";
// import { UserStateContext, DispatchContext } from "../App";

function Navigation() {
  const { Header } = Layout;

  //   const userState = useContext(UserStateContext);
  //   const dispatch = useContext(DispatchContext);

  //   const isLogin = !!userState.user;
  const homeMenu = useRef(null);

  const HeaderLight = styled(Header)`
    background-color: white;
    border-bottom: 1px solid #f0f0f0;
  `;

  const isLogin = false;

  const NavMenu = styled(Menu)`
    float: right;
    font-size: 16px;

    & > .ant-menu-item-selected a,
    & > .ant-menu-item a:hover {
      color: ${theme.naturalGreen};
      font-weight: 700;
    }

    & .ant-menu-item::after,
    .ant-menu-submenu::after {
      border: none !important;
    }
  `;

  const NavLink = styled(Link)`
    box-sizing: border-box;
    display: inline-block;
    color: #000;
    &:hover {
      color: #9ac355;
    }
  `;

  const Logo = styled.div`
    float: left;
    width: 180px;
    height: 44px;
    cursor: pointer;
  `;

  const LogoImage = styled.img`
    height: 100%;
    width: 100%;
    object-fit: contain;
    padding: 4px 10px 8px 0;
  `;

  function handleClick() {
    console.log(homeMenu.current);
    homeMenu.current.click();
  }

  return (
    <Layout>
      <HeaderLight>
        <Link to="/">
          <Logo onClick={handleClick}>
            <LogoImage src="/Logo.png" />
          </Logo>
        </Link>
        <NavMenu mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/" ref={homeMenu}>
              <span>홈</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/detail">
              <span>산찾기</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/community">
              <span>커뮤니티</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            {isLogin ? (
              <Link to="/users/:userId">MYPAGE ICON</Link>
            ) : (
              <Link to="/login">로그인</Link>
            )}
          </Menu.Item>
        </NavMenu>
      </HeaderLight>
    </Layout>
  );
}

export default Navigation;
