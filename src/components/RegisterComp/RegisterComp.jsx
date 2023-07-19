import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
// import { auth } from "../../firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addUsers, getUsers } from '../../api/users';

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

  const queryClient = useQueryClient();
  const mutation = useMutation(addUsers, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      console.log('신규 회원 가입 & 데이터 최신화 성공!!!');
    },
    onError: () => {
      alert('죄송합니다. 현재 서버가 불안정한 상태입니다. 최대한 빠르게 복구하겠습니다.');
    }
  });

  // db.json에서 users collection Get
  const { data, isLoading, isError } = useQuery('users', getUsers);
  if (isLoading) {
    console.log('loading중');
  }
  if (isError) {
    alert('닉네임 중복검사 데이터get 에러');
    return false;
  }
  const nameUsing = data?.map((item) => item.name);
  const emailUsing = data?.map((item) => item.email);

  // const HandleName = (event) => {
  //   event.preventDefault();

  //   if (nameUsing.includes(name)) {
  //     alert('누군가 이 닉네임을 사용중입니다!');
  //     setIsNameAvailable(false);
  //     return false;
  //   } else {
  //     alert('사용 가능한 닉네임입니다!');
  //     setIsNameAvailable(true);
  //   }
  // };

  const HandleInputChange = (event, setState, setStateMessage) => {
    setStateMessage("")
    setState(event.target.value);
  }

  // 회원정보 입력시 유효성 검사에 따라 메시지 출력
  const HandleInputValidation = (event) => {
    event.preventDefault();
    const currentName = event.target.name;
    const currentValue = event.target.value;
    switch (currentName) {
      case 'name':
        const nameRegExp = /^[가-힣a-zA-Z0-9][가-힣a-zA-Z0-9]{1,9}$/;
        
        if (!nameRegExp.test(currentValue)) {
          setNameMessage('2~10 사이의 한글*영문 대소문자 또는 숫자만 입력해주세요!');
          setIsName(false);
        } else if (nameUsing.includes(currentValue)) {
          setNameMessage('누군가 이 닉네임을 사용중입니다!');
          setIsName(false);
        } else {
          setNameMessage('사용가능한 닉네임입니다.');
          setIsName(true);
        }
        break;

      case 'email':
        const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegExp.test(currentValue)) {
          setEmailMessage('올바른 이메일 형식이 아닙니다.');
          setIsEmail(false);
        } else if (emailUsing.includes(currentValue)) {
          setEmailMessage('누군가 이 이메일을 사용중입니다!');
          setIsEmail(false);
        }else {
          setEmailMessage('사용가능한 이메일입니다.');
          setIsEmail(true);
        }
        break;

      case 'pw':
        const pwRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
        if (!pwRegExp.test(currentValue)) {
          setPwMessage('비밀번호는 문자, 숫자, 특수문자를 포함한 8자리 이상입니다!');
          setIsPw(false);
        } else {
          setPwMessage('사용가능한 비밀번호입니다!');
          setIsPw(true);
        }
        break;

      case 'pwCheck':
        if (!(currentValue == pw)) {
          setPwCheckMessage('확인 비밀번호가 일치하지 않습니다');
          setIsPwCheck(false);
        } else {
          setPwCheckMessage('확인 비밀번호가 일치합니다!');
          setIsPwCheck(true);
        }
        break;

      default:
        break;
    }
  };

  // 회원등록 버튼 클릭시 유효성 검사
  const HandleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isPwCheck === false) {
        alert('확인 비밀번호가 일치하지 않습니다!');
        return false;
      } else if ((isName || isEmail || isPw || isPwCheck) === false) {
        alert('입력정보를 다시 확인해 주세요!');
        return false;
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pw);

        // 회원가입 => 자동 로그인(진짜 자동 로그인인지 확인해야 함. 이 부분 불명확. 07-17 17:16 동준) => 미리 토큰을 받아 세션스토리지에 저장.
        const user = userCredential.user;
        const token = await user.getIdToken();
        sessionStorage.setItem('token', token);

        const newUser = {
          id: auth.currentUser.uid ? auth.currentUser.uid : '작성자 uid 오류',
          name,
          email,
          pw
        };
        mutation.mutate(newUser);
        alert('회원가입을 완료했습니다.');
        navigate('/');
        window.location.reload();
      }
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
          <input
            name="name"
            type="text"
            placeholder="2글자~10글자 닉네임"
            value={name}
            onChange={(event) => HandleInputChange(event, setName, setNameMessage)}
            onBlur={(event) => HandleInputValidation(event)}
          />
          <p className="message"> {nameMessage} </p>
        </div>
        <div>
          <label>이메일</label>
          <input
            name="email"
            type="text"
            placeholder="healthZZang@reactprotain.com"
            value={email}
            onChange={(event) => HandleInputChange(event, setEmail, setEmailMessage)}
            onBlur={(event) => HandleInputValidation(event)}
          />
          <p className="message"> {emailMessage} </p>
        </div>
        <div>
          <label>비밀번호</label>
          <input
            name="pw"
            type="password"
            placeholder="대소문자, 숫자, 특수문자 포함 8자 이상"
            value={pw}
            onChange={(event) => HandleInputChange(event, setPw, setPwMessage)}
            onBlur={(event) => HandleInputValidation(event)}
          />
          <p className="message"> {pwMessage} </p>
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input
            name="pwCheck"
            type="password"
            placeholder="비밀번호와 동일하게 적어주세요!"
            value={pwCheck}
            onChange={(event) => HandleInputChange(event, setPwCheck, setPwCheckMessage)}
            onBlur={(event) => HandleInputValidation(event)}
          />
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
