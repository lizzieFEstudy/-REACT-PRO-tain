import { css, styled } from "styled-components";

export const CommentInput = styled.input`
  background: transparent;
  border: 1px solid black;
  border-radius: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
  width: 300px;
  height: 30px;
  padding: 10px;
  color: black;
`;

export const StPriceInput = styled.input`
  background: transparent;
  border: 1px solid black;
  border-radius: 20px;
  margin-left: 20px;
  width: 180px;
  height: 20px;
  padding: 10px;
  color: black;
`;

export const StDetailPage = styled.div`
  margin: 100px auto 0px;
  border: 1px solid red;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StDetailBox = styled.div`
  display: ${(props) => (props.display ? props.display : "flex")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  ${({ size }) => {
    switch (size) {
      case 'placeTitle':
        return css`
          width: 70%;
        `;
      case 'placeDetail':
        return css`
          width: 70%;
        `;
      case 'placeReviews':
        return css`
          width: 70%;
        `;
    }
  }}
`;

export const StDetailTitle = styled.div`
  font-size: 3rem;
  font-weight: bold;
  padding: 10px 30px;
  color: white;
  background-color: #ff6e6e;
  border-radius: 30px;
  margin-top: 2rem;
`

export const StReviewCountBox = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem;
`;

export const StReviewInfo = styled.div`
  display:flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  color: #ff6e6e;
  background-color: white;
  border: 1px solid #ff6e6e;
  font-weight: bold;
  border-radius: 10px;
  padding: 10px;
  margin: 0 1rem;
`

export const StReviewInfo2 = styled.div`
  display:flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  color: black;
  font-weight: bold;
  border-radius: 10px;
  padding: 10px;
`

export const StarButton = styled.button`
  font-size: 20px;
  color: ${(props) => (props.active ? 'gold' : 'gray')};
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
`;

export const StCommentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid #f25320;
  border-radius: 10px;
  padding: 20px 10px;
  width: 80%;
  position: relative;
  margin : 3px auto;
  gap: 1rem;
`;

export const StCommentHeader  = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const StCommentBtnCtn  = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`

export const StCommentButtons = styled.div`
  margin : 0px 5px;
  gap: 5px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const StCommentContent = styled.div`
  margin-bottom: 10px;
`;



export const StBtnWrap = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  gap: 5px;
`;

export const StCommentDetails = styled.div`
  display: flex;
  align-items: center;
`;

export const StDropdownCtn = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
`;

export const StDropdown = styled.div`
  user-select: none;
  width: 300px;
  margin: 20px;
  position: relative;
`;

export const StDropdownBtn = styled.div`
  cursor: pointer;
  padding: 15px 20px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StDropdownContent = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  padding: 10px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 20px;
  width: 95%;
`;

export const StDropdownItem = styled.div`
  cursor: pointer;
  padding: 10px;
  transition: all 0.2s;
  &:hover {
    background-color: #f4f4f4;
  }
`;

export const StModalBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: beige;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  animation: colorChange 0.4 linear;
  @keyframes colorChange {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
export const StModalCtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  background-color: white;
  padding: 20px;
  width: 40%;
  height: 30%;
  border-radius: 12px;
  z-index: 2;
  animation: dropTop 0.4s linear;
  @keyframes dropTop {
    0% {
      transform: translateY(-30%);
      opacity: 0;
    }
    100% {
      transform: translateY(0%);
      opacity: 1;
    }
  }
`
export const StCloseModalBtn = styled.button`
  background-color: White;
  border: 1px solid black;
  border-radius: 50%;
  transform: scale(1.2);
  margin-left: 700px;
`

export const StUpdateModalCtn = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`