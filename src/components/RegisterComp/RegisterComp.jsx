import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
// import { auth } from "../../firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegisterComp = () => {
  const navigate = useNavigate()

  //RQ : 추후에 useState 한번에 관리하는 방법으로 변경(객체 or useRef???) (07-17 16:34 동준)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  // 현재 phoneNum은 포함하지 않음.
  const [phoneNum, setPhoneNUm] = useState("");

  const HandleInputChange = (event, setState) => {
    setState(event.target.value);
  };
  const HandleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pw);

      // 회원가입 => 자동 로그인(진짜 자동 로그인인지 확인해야 함. 이 부분 불명확. 07-17 17:16 동준) => 미리 토큰을 받아 세션스토리지에 저장.
      const user = userCredential.user;
      const token = await user.getIdToken();
      sessionStorage.setItem("token", token);

      alert("회원가입을 완료했습니다!");
      navigate("/");
      window.location.reload();
    } catch (error) {
      alert("회원가입 파이어베이스 오류");
      return false;
    }
  };
  useEffect(() => {
    console.log("auth=>", auth);
  }, []);

  return (
    <StSection>
      <form onSubmit={HandleRegisterSubmit}>
        <div>
          <label>닉네임</label>
          <input type="text" value={name} onChange={(event) => HandleInputChange(event, setName)} />
        </div>
        <div>
          <label>이메일</label>
          <input type="text" value={email} onChange={(event) => HandleInputChange(event, setEmail)} />
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" value={pw} onChange={(event) => HandleInputChange(event, setPw)} />
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input type="password" value={pwCheck} onChange={(event) => HandleInputChange(event, setPwCheck)} />
        </div>
        <button>회원가입</button>
      </form>
      <button onClick={() => navigate("/login")}>로그인 페이지 이동</button>
    </StSection>
  );
};

export default RegisterComp;

const StSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;
