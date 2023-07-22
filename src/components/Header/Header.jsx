import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const Header = () => {
  const navigate = useNavigate();

  const token = sessionStorage.getItem('token') || null;

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      // 임시로 true값으로 설정.
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  const logOutFunc = async (event) => {
    event.preventDefault();
    await signOut(auth);
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <S.Header>
      <S.MenuCtn gap="0px">
        <S.MenuSpan onClick={() => navigate('/')}>로고(메인으로감)</S.MenuSpan>
        <S.MenuSpan borderright="3px solid white" onClick={() => navigate('/others')}>
          임시용메뉴
        </S.MenuSpan>
      </S.MenuCtn>
      <S.MenuCtn gap="0px">
        {isLoggedIn === true ? (
          <S.MenuSpan onClick={(event) => logOutFunc(event)}>로그아웃</S.MenuSpan>
        ) : (
          <S.MenuSpan onClick={() => navigate('/login')}>로그인</S.MenuSpan>
        )}
        {isLoggedIn === true ? (
          <S.MenuSpan borderright="3px solid white" onClick={() => navigate('/mypage')}>
            프로필위치
          </S.MenuSpan>
        ) : (
          <S.MenuSpan borderright="3px solid white" onClick={() => navigate('/register')}>
            회원가입
          </S.MenuSpan>
        )}
      </S.MenuCtn>
    </S.Header>
  );
};

export default Header;

const S = {
  Header: styled.header`
    background-color: #f25320;
    width: 100;
    height: 80px;
    display: flex;
    justify-content: space-between;
  `,
  MenuCtn: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${(props) => props.gap};
    margin: 0px 30px;
  `,
  MenuSpan: styled.span`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0px 20px;
    border-left: 3px solid white;
    border-right: ${(props) => (props.borderright ? props.borderright : 'none')};
    height: 100%;
  `
};
