import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import KakaoMap from './KakaoMap';

const MainComp = () => {
  const navigate = useNavigate()

  useEffect(() => {
    console.log("auth=>", auth);
  }, []);

  const HandleLogOut = async (event) => {
    event.preventDefault();
    try {
      await signOut(auth);
      sessionStorage.removeItem("token");
      window.location.reload()

      navigate("/login")
    } catch (error) {
      alert("로그아웃 에러 발생");
    }
  };
  return (
    <>
      <KakaoMap/>
      <button onClick={(event) => HandleLogOut(event)}>로그아웃</button>
    </>
  );
};

export default MainComp