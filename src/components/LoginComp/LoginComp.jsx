import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom/dist';
import { useQuery, useQueryClient } from 'react-query';
import { getUsers } from '../../api/users';

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
    const pwValidation = (emailValidation?.pw == pw) ? true : false
    if ((emailValidation == [] || (pwValidation == false))) {
      console.log(pwValidation)
      alert('이메일 혹은 비밀번호를 잘못 입력하셨거나 등록되지 않은 이메일입니다.');
      return false;
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, pw);
        const user = userCredential.user;
        const token = await user.getIdToken();
        sessionStorage.setItem('token', token);
        //추후에 window.location.reload 말고 Main page로 바로 가도록 고쳐야 함.
        window.location.reload();
      } catch (error) {
        alert('로그인 인증 에러');
        setEmail('');
        setPw('');
      }
    }
  };

  return (
    <div>
      <form onSubmit={HandleLoginSubmit}>
        <label>이메일 주소</label>
        <input type="text" value={email} onChange={(event) => HandleInputChange(event, setEmail)} />
        <label>비밀번호</label>
        <input type="password" value={pw} onChange={(event) => HandleInputChange(event, setPw)} />
        <button>로그인</button>
      </form>
      <button onClick={() => navigate('/register')}>회원가입 페이지로 이동</button>
    </div>
  );
};

export default LoginComp;
