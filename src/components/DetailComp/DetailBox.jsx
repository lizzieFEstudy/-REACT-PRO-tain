import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
<<<<<<< HEAD
<<<<<<< HEAD
import styled, { css } from 'styled-components';
=======
import { UseSelector } from 'react-redux';
>>>>>>> eaef9156f34a3d75cbc39e297cf7e70f49b93efb
=======
import styled, { css } from 'styled-components';
>>>>>>> 7bdf05fbc12915a125d8fd8ef30a23c37ce546b0
import { getComments, addComment, deleteComment, updateComment } from '../../api/comments';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { auth } from '../../firebase';
<<<<<<< HEAD
<<<<<<< HEAD

import { VscTriangleDown } from 'react-icons/vsc';
=======
=======
>>>>>>> 7bdf05fbc12915a125d8fd8ef30a23c37ce546b0
import { getUsers } from '../../api/users';
import {
  CommentInput,
  StDetailPage,
  StDetailBox,
  StReviewCountBox,
  StarButton,
  StCommentBox,
  StCommentHeader,
  StCommentContent,
  StCommentButtons,
  StBtnWrap,
  StCommentDetails
} from './DetailStyles';
<<<<<<< HEAD
>>>>>>> eaef9156f34a3d75cbc39e297cf7e70f49b93efb
=======
>>>>>>> 7bdf05fbc12915a125d8fd8ef30a23c37ce546b0

const DetailBox = ({ placeData }) => {
  const navigate = useNavigate();
  const params = useParams();

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const [displayedComments, setDisplayedComments] = useState([]);

  // Define state variables for edit mode
  const [editMode, setEditMode] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editComment, setEditComment] = useState('');
  const [editRating, setEditRating] = useState(0);

  // Function to toggle edit mode
  const toggleEditMode = (commentId, comment, rating) => {
    setEditMode(!editMode);
    setEditCommentId(commentId);
    setEditComment(comment);
    setEditRating(rating);
  };

  const { data } = useQuery('comments', getComments, {
    onSuccess: (data) => {
      console.log('Fetched data:', data);
      setDisplayedComments(data.filter((comment) => comment.shopId === shopId));
    }
  });

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7bdf05fbc12915a125d8fd8ef30a23c37ce546b0
  //가격정보 select창 관련
  const currentPlace = placeData.category_name.split('>').pop().trim()
  console.log("currentPlace=>",currentPlace)
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState('');
  const showDropdown = () => {
    setIsActive(!isActive);
  };
  const [price, setPrice] = useState('')
  const options = (() => {
    if (currentPlace.includes("헬스")) {
        return ['헬스이용권 1개월', '헬스이용권 3개월', '헬스이용권 6개월','헬스이용권 12개월', 'PT 10회', 'PT 20회','PT 30회']
      } else if (currentPlace.includes("필라테스")) {
        return ['필라테스 회원권 1개월', '필라테스 회원권 3개월', '필라테스 회원권 6개월', '필라테스 회원권 12개월', 'PT 10회', 'PT 20회','PT 30회', '그룹레슨'] 
      } else if (currentPlace.includes("요가")) {
        return ['요가 회원권 1개월', '요가 회원권 6개월', '요가 회원권 9개월', '요가 회원권 12개월', 'PT 10회', 'PT 20회','PT 30회', '그룹레슨'] 
      } else if (currentPlace.includes("협회") || currentPlace.includes("댄스")) {
        return ['댄스 회원권 1개월', '댄스 회원권 6개월', '댄스 회원권 9개월', '댄스 회원권 12개월', 'PT 10회', 'PT 20회','PT 30회', '그룹레슨'] 
      } else {
        return ["죄송합니다. 아직 해당 기관 정보를 받지 못했습니다."]
      }})()
  
  const addComma = (value) => {
    // 입력된 값에서 숫자 이외의 문자를 모두 제거
    const numericValue = value.replace(/[^\d]/g, '');
    // 콤마 추가한 문자열 생성
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formattedValue ? formattedValue + '₩' : ''
  };
  const handleChange = (event) => {
    // 1000단위마다 콤마를 추가하여 설정
    setPrice(addComma(event.target.value));
  };

  //가격정보 select창 관련
<<<<<<< HEAD
=======
=======
>>>>>>> 7bdf05fbc12915a125d8fd8ef30a23c37ce546b0
  const { data: userData } = useQuery('users', getUsers, {
    onSuccess: (userData) => {
      console.log('Fetched userData:', userData);
    }
  });
<<<<<<< HEAD
>>>>>>> eaef9156f34a3d75cbc39e297cf7e70f49b93efb
=======
>>>>>>> 7bdf05fbc12915a125d8fd8ef30a23c37ce546b0

  const shopId = params.id;

  //별점 구하는 곳
  const reviews = data?.filter((item) => item.shopId === shopId);
  const commentRatingArr = reviews?.map((item) => item.rating);
  const commentRatingSum = commentRatingArr?.reduce((acc, cur) => acc + cur, 0);
  // 리뷰 개수
  const commentRatingLength = commentRatingArr?.length;
  // 총 별점 평균
  const RatingAvg = (commentRatingSum / commentRatingLength).toFixed(2);
  console.log(RatingAvg)

  const queryClient = useQueryClient();

  const mutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    }
  });

  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    }
  });

  const updateMutation = useMutation(updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    }
  });

  const addCommentHandler = async () => {
    if (!comment || rating === 0 || !selected || !price) {
      alert('모든 항목을 입력하세요');
      return;
    }

    const newComment = {
      shopId,
      comment,
      rating,
      userId: auth.currentUser.uid,
<<<<<<< HEAD
<<<<<<< HEAD
      selected,
      price,
=======
      createdAt: new Date().toISOString()
>>>>>>> eaef9156f34a3d75cbc39e297cf7e70f49b93efb
=======
      selected,
      price,
      createdAt: new Date().toISOString()
>>>>>>> 7bdf05fbc12915a125d8fd8ef30a23c37ce546b0
    };

    mutation.mutate(newComment);

    setComment('');
    setRating(0);
  };

  const deleteCommentHandler = (id) => {
    const confirmed = window.confirm('이 댓글을 삭제하시겠습니까?');
    if (confirmed) {
      deleteMutation.mutate(id);
      setDisplayedComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
    }
  };

  const updateCommentHandler = async (id) => {
    const confirmed = window.confirm('이 댓글을 수정하시겠습니까?');
    if (confirmed) {
      const updatedComment = {
        id,
        shopId,
        comment: editComment,
        rating: editRating,
        userId: auth.currentUser.uid,
        createdAt: new Date().toISOString()
      };

      try {
        await updateComment(updatedComment);
        // After successful update, reset the edit mode
        setEditMode(false);
        setEditCommentId(null);
        setEditComment('');
        setEditRating(0);
      } catch (error) {
        console.error('Error updating comment:', error);
        // Handle error if needed
      }
    }
  };

  const commentHandler = (event) => {
    setComment(event.target.value);
  };

  const handleRatingSelection = (ratingValue) => {
    setRating(ratingValue);
  };
<<<<<<< HEAD
<<<<<<< HEAD
=======

=======
  
>>>>>>> 7bdf05fbc12915a125d8fd8ef30a23c37ce546b0
  const getUserName = (userId) => {
    const user = userData?.find((user) => user.id === userId);
    return user?.name || 'Unknown User'; // Return 'Unknown User' if user is not found
  };

  const formatDate = (dateString) => {
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString('ko-KR', dateOptions);
  };

<<<<<<< HEAD
>>>>>>> eaef9156f34a3d75cbc39e297cf7e70f49b93efb
=======
>>>>>>> 7bdf05fbc12915a125d8fd8ef30a23c37ce546b0
  return (
    <>
      <StDetailPage style={{ marginTop: '100px' }}>
        <StDetailBox size="placeTitle">
          <div>{placeData?.place_name}</div>
          <StReviewCountBox>
            <div>별점: {isNaN(RatingAvg) ? 0 : RatingAvg }</div>
            <div>방문자 리뷰: {commentRatingLength}</div>
          </StReviewCountBox>
        </StDetailBox>
        <StDetailBox size="placeDetail">
          <div>{placeData?.road_address_name}</div>
          <div>{placeData?.phone ? placeData?.phone : '사장님 전화번호 넣어주세요!!'}</div>
        </StDetailBox>
        <StDetailBox size="placeReviews">
          <br />
          {data
            ?.filter((comment) => comment.shopId === shopId)
            .map((comment) => {
              const formattedDate = formatDate(comment.createdAt);
              const isEditing = editMode && editCommentId === comment.id;
              return (
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7bdf05fbc12915a125d8fd8ef30a23c37ce546b0
                <div key={comment.id}>
                  {/* <div>{users.name}</div> */}
                  <strong>
                    name| 별점 {comment.rating.toFixed(1)}| {comment.date}
                  </strong>
                  <div>
                    회원권 종류 : {comment.selected}
                  </div>
                  <div>
                    가격 : {comment.price}
                  </div>
                  <button
                    onClick={() => {
                      updateCommentHandler(comment.id);
                    }}
                  >
                    수정
                  </button>
                  <button
                    onClick={() => {
                      deleteCommentHandler(comment.id);
                    }}
                  >
                    삭제
                  </button>
                  <div>{comment.comment}</div>
                </div>
<<<<<<< HEAD
=======
=======
>>>>>>> 7bdf05fbc12915a125d8fd8ef30a23c37ce546b0
                <StCommentBox key={comment.id}>
                  <StCommentHeader>
                    <StCommentDetails>
                      {/* Comment details (username, rating, date) */}
                      <strong>{getUserName(comment.userId)}</strong> | 별점 {comment.rating.toFixed(1)} |{' '}
                      {formattedDate !== 'Invalid Date' ? formattedDate : 'No Date'}
                    </StCommentDetails>
                    <StBtnWrap>
                      {isEditing ? ( // Show "완료" (Done) button in edit mode
                        <StCommentButtons onClick={() => updateCommentHandler(comment.id)}>완료</StCommentButtons>
                      ) : (
                        // Show "수정" (Edit) button in non-edit mode
                        <StCommentButtons onClick={() => toggleEditMode(comment.id, comment.comment, comment.rating)}>
                          수정
                        </StCommentButtons>
                      )}
                      <StCommentButtons
                        onClick={() => {
                          deleteCommentHandler(comment.id);
                        }}
                      >
                        삭제
                      </StCommentButtons>
                    </StBtnWrap>
                  </StCommentHeader>
                  <StCommentContent>{isEditing ? null : comment.comment}</StCommentContent>
                </StCommentBox>
<<<<<<< HEAD
>>>>>>> eaef9156f34a3d75cbc39e297cf7e70f49b93efb
=======
>>>>>>> 7bdf05fbc12915a125d8fd8ef30a23c37ce546b0
              );
            })}
        </StDetailBox>
        <StDetailBox size="placeDetail">
          <h1>리뷰를 남겨보세요</h1>
          <br />
          <div>
            <StarButton active={rating >= 1} onClick={() => handleRatingSelection(1)}>
              ★
            </StarButton>
            <StarButton active={rating >= 2} onClick={() => handleRatingSelection(2)}>
              ★
            </StarButton>
            <StarButton active={rating >= 3} onClick={() => handleRatingSelection(3)}>
              ★
            </StarButton>
            <StarButton active={rating >= 4} onClick={() => handleRatingSelection(4)}>
              ★
            </StarButton>
            <StarButton active={rating >= 5} onClick={() => handleRatingSelection(5)}>
              ★
            </StarButton>
          </div>
            <StDropdownCtn>
            <StDropdown>
              <StDropdownBtn onClick={showDropdown}>
                {selected || '가격정보를 입력해주세요!!'}
                <VscTriangleDown />
                {isActive && (
                  <StDropdownContent>
                    {options.map((option) => (
                      <StDropdownItem
                        onClick={(event) => {
                          setSelected(option);
                          setIsActive(false);
                        }}
                      >
                        {option}
                      </StDropdownItem>
                    ))}
                  </StDropdownContent>
                )}
              </StDropdownBtn>
            </StDropdown>
            <input type="text" value={price} onChange={handleChange} placeholder='ex) 3,00,000 ₩'/>
            </StDropdownCtn>


          <CommentInput
            type="text"
            value={comment}
            onChange={(event) => commentHandler(event)}
            placeholder="내용을 입력하세요."
          />

          <button onClick={addCommentHandler}>등록</button>
        </StDetailBox>
      </StDetailPage>
    </>
  );
};

export default DetailBox;
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 7bdf05fbc12915a125d8fd8ef30a23c37ce546b0

const CommentInput = styled.input`
  background: transparent;
  border: 1px solid white;
  margin-left: 20px;
  margin-bottom: 20px;
  width: 300px;
  height: 30px;
  padding: 5px;
  color: black;
`;

const StDetailPage = styled.div`
  margin: 100px auto 0px;
  border: 1px solid red;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ size }) => {
    switch (size) {
      case 'placeTitle':
        return css`
          width: 50%;
          height: 20%;
        `;
      case 'placeDetail':
        return css`
          width: 70%;
          height: 20%;
        `;
      case 'placeReviews':
        return css`
          width: 70%;
          height: 80%;
        `;
    }
  }}
  border: 1px solid black;

  /* align-items: center; */
`;
const StReviewCountBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const StarButton = styled.button`
  font-size: 20px;
  color: ${(props) => (props.active ? 'gold' : 'gray')};
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
`;

const StDropdownCtn = styled.div`
 display: flex;
 flex-direction: row;
`;

const StDropdown = styled.div`
  user-select: none;
  width: 300px;
  margin: 20px;
  position: relative;
`;

const StDropdownBtn = styled.div`
  cursor: pointer;
  padding: 15px 20px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StDropdownContent = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  padding: 10px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 20px;
  width: 95%;
`;

const StDropdownItem = styled.div`
  cursor: pointer;
  padding: 10px;
  transition: all 0.2s;
  &:hover {
    background-color: #f4f4f4;
  }
`;
<<<<<<< HEAD
=======
>>>>>>> eaef9156f34a3d75cbc39e297cf7e70f49b93efb
=======

>>>>>>> 7bdf05fbc12915a125d8fd8ef30a23c37ce546b0
