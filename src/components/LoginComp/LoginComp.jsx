import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom/dist';
import { useQuery } from 'react-query';
import { getUsers } from '../../api/users';
import { styled } from 'styled-components';

const LoginComp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const { data, isLoading, isError } = useQuery('users', getUsers);
  if (isLoading) {
    console.log('loading중');
  }
  if (isError) {
    alert('로그인 유저정보 Get 에러');
    return false;
  }

  const HandleInputChange = (event, setState) => {
    setState(event.target.value);
  };

  const HandleLoginSubmit = async (event) => {
    event.preventDefault();
    // 로그인 정보 유효성 검사
    const [emailValidation] = data?.filter((item) => item.email == email);
    const pwValidation = emailValidation?.pw == pw ? true : false;
    if (emailValidation == [] || pwValidation == false) {
      console.log(pwValidation);
      alert('이메일 혹은 비밀번호를 잘못 입력하셨거나 등록되지 않은 이메일입니다.');
      return false;
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, pw);
        const user = userCredential.user;
        const token = await user.getIdToken();
        sessionStorage.setItem('token', token);
        //추후에 window.location.reload 말고 Main page로 바로 가도록 고쳐야 함.
        navigate("/")     
        window.location.reload()

      } catch (error) {
        alert('로그인 인증 에러');
        setEmail('');
        setPw('');
      }
    }
  };



  return (
    <StLoginCtn>
      <StLoginForm onSubmit={HandleLoginSubmit}>
        <StLoginLogo>💪🏽REACT PROtein</StLoginLogo>
        <div>
          <label>이메일</label>
          <br />
          <StLoginInput type="text" value={email} onChange={(event) => HandleInputChange(event, setEmail)} />
        </div>
        <div>
          <label>비밀번호</label>
          <br />
          <StLoginInput type="password" value={pw} onChange={(event) => HandleInputChange(event, setPw)} />
        </div>

        <StLoginBtn>로그인</StLoginBtn>
        <StGoRegisterSpan onClick={() => navigate('/register')}>계정이 없으세요? 프로틴 가입하기</StGoRegisterSpan>
      </StLoginForm>
    </StLoginCtn>
  );
};

export default LoginComp;

const StLoginCtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  margin: auto;
`;

const StLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 500px;
  min-height: 700px;
  width: 20%;
  height: 50%;
  border: 5px solid #f25320;
  border-radius: 10%;
  box-shadow: rgb(255, 110, 110) 20px 30px 30px -10px;
  margin: auto;
  gap: 1.5rem;
`

const StLoginLogo = styled.div`
  margin: 0 0 2rem;
  transform: scale(2);
  font-weight: bold;
`

const StLoginInput = styled.input`
  width: 15rem;
  height: 1rem;
  font-size: 16px;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: none;
  border-bottom: 2px solid black;
  outline: none;
  &:focus {
    border-bottom: 2px solid #ff6e6e;
  }
`

const StLoginBtn = styled.button`
  margin-top: 0.5rem;
  width: 16rem;
  height: 2.5rem;
  font-size: 20px;
  background-color: white;
  color: #ff6e6e;
  font-weight: bold;
  border: 1px solid #ff6e6e;
  cursor: pointer;
  &:hover {
    transition-duration: 0.5s;
    background-color: #ff6e6e;
    color: white;
    font-weight: bold;
  }
`;

const StGoRegisterSpan = styled.span`
  margin-top: 3rem;
  text-align: center;
  width: 20rem;
  height: 2rem;
  cursor: pointer;
  &:hover {
    transition-duration: 0.2s;
    color: #ff6e6e;
    text-decoration: underline;
    font-weight: bold;
  }
`;
