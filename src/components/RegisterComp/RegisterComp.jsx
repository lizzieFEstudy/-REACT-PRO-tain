import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
// import { auth } from "../../firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterComp = () => {
  const navigate = useNavigate();

  //RQ : 추후에 useState 한번에 관리하는 방법으로 변경(객체 or useRef???) (07-17 16:34 동준)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  // 현재 phoneNum은 포함하지 않음.
  // const [phoneNum, setPhoneNUm] = useState("");

  const [nameMessage, setNameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [pwMessage, setPwMessage] = useState('');
  const [pwCheckMessage, setPwCheckMessage] = useState('');
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isPwCheck, setIsPwCheck] = useState(false);


  const HandleInputChange = (event) => {
    event.preventDefault();
    const currentName = event.target.name;
    const currentValue = event.target.value;
    switch (currentName) {
      case 'name':
        setName(currentValue);
        const nameRegExp = /^[가-힣a-zA-Z0-9][가-힣a-zA-Z0-9]{2,9}$/;
        if (!nameRegExp.test(currentValue)) {
          setNameMessage('2~10 사이의 한글*영문 대소문자 또는 숫자만 입력해주세요!');
          setIsName(false);
        } else {
          setNameMessage('사용가능한 아이디입니다.');
          setIsName(true);
        }
        break;

      case 'email':
        setEmail(currentValue)
        const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegExp.test(currentValue)) {
          setEmailMessage('올바른 이메일 형식이 아닙니다.');
          setIsEmail(false);
        } else {
          setEmailMessage('사용가능한 이메일입니다.');
          setIsEmail(true);
        }
        break;
        
        case 'pw':
        setPw(currentValue);
        const pwRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

        if (!pwRegExp.test(currentValue)) {
          setPwMessage('비밀번호는 문자, 숫자, 특수문자 8자리 이상입니다!');
          setIsPw(false);
        } else {
          setPwMessage('사용가능한 비밀번호입니다!');
          setIsPw(true);
        }
        break;

        case 'pwCheck':
          setPwCheck(currentValue);
        if (!(currentValue == pw)) {
          setPwCheckMessage('비밀번호가 일치하지 않습니다');
          setIsPwCheck(false);
        } else {
          setPwCheckMessage('비밀번호가 일치합니다!');
          setIsPwCheck(true);
        }
        break;
        
        default:
          break;
    }
  }
  // const HandleInputChange = (event, setState) => {
  //   setState(event.target.value);
  // };
  const HandleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pw);

      // 회원가입 => 자동 로그인(진짜 자동 로그인인지 확인해야 함. 이 부분 불명확. 07-17 17:16 동준) => 미리 토큰을 받아 세션스토리지에 저장.
      const user = userCredential.user;
      const token = await user.getIdToken();
      sessionStorage.setItem('token', token);

      alert('회원가입을 완료했습니다!');
      navigate('/');
      window.location.reload();
    } catch (error) {
      alert('회원가입 파이어베이스 오류');
      return false;
    }
  };

  return (
    <StSection>
      <form onSubmit={HandleRegisterSubmit}>
        <div>
          <label>닉네임</label>
          <input name="name" type="text" placeholder="2글자~10글자 닉네임" value={name} onChange={(event) => HandleInputChange(event)} />
          <p className="message"> {nameMessage} </p>
        </div>
        <div>
          <label>이메일</label>
          <input name="email" type="text" placeholder="healthZZang@reactprotain.com" value={email} onChange={(event) => HandleInputChange(event)} />
          <p className="message"> {emailMessage} </p>
        </div>
        <div>
          <label>비밀번호</label>
          <input name="pw" type="password" placeholder="대소문자, 숫자, 특수문자 포함 8자 이상" value={pw} onChange={(event) => HandleInputChange(event)} />
          <p className="message"> {pwMessage} </p>
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input name="pwCheck" type="password" placeholder="비밀번호와 동일하게 적어주세요!" value={pwCheck} onChange={(event) => HandleInputChange(event)} />
          <p className="message"> {pwCheckMessage} </p>
        </div>
        <button>회원가입</button>
      </form>
      <button onClick={() => navigate('/login')}>로그인 페이지 이동</button>
    </StSection>
  );
};

export default RegisterComp;

const StSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;
