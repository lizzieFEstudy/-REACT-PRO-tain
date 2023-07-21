import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { getComments, addComment, deleteComment, updateComment } from '../../api/comments';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { auth } from '../../firebase';
import { GiStoneCrafting } from 'react-icons/gi';
import { addShops, getShops, updateShops } from '../../api/shops';

const DetailBox = ({ placeData }) => {
  const navigate = useNavigate();
  const params = useParams();

  const [nickName, setNickName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const [displayedComments, setDisplayedComments] = useState([]);

  const { isLoading, isError, data } = useQuery('comments', getComments, {
    onSuccess: (data) => {
      setDisplayedComments(data.filter((comment) => comment.shopId === shopId));
    }
  });

  const shopId = params.id;

  //별점 구하는 곳
  const reviews = data?.filter((item) => item.shopId === shopId)
  const commentRatingArr = reviews?.map((item) => item.rating)
  const commentRatingSum = commentRatingArr?.reduce((acc, cur) => {
    return acc + cur
  })
  // 리뷰 개수
  const commentRatingLength = commentRatingArr?.length
  // 총 별점 평균
  const RatingAvg = (commentRatingSum/commentRatingLength).toFixed(2)

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

    if (!comment || rating === 0) {
      alert('모든 항목을 입력하세요');
      return;
    }

    const newComment = {
      shopId,
      nickName,
      comment,
      rating,
      userId: auth.currentUser.uid
    };

    mutation.mutate(newComment);

    setNickName('');
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

  const updateCommentHandler = (id) => {
    const confirmed = window.confirm('이 댓글을 수정하시겠습니까?');
    if (confirmed) {
      updateMutation.mutate(id);
    }
  };

  const commentHandler = (event) => {
    setComment(event.target.value);
  };

  const handleRatingSelection = (ratingValue) => {
    setRating(ratingValue);
  };
  return (
    <>
      <StDetailPage style={{ marginTop: '100px' }}>
        <StDetailBox size="placeTitle">
          <div>{placeData?.place_name}</div>
          <StReviewCountBox>
            <div>별점: {RatingAvg}</div>
            <div>방문자 리뷰: {commentRatingLength}</div>
          </StReviewCountBox>
        </StDetailBox>
        <StDetailBox size="placeDetail">
          <div>{placeData?.road_address_name}</div>
          <div>{placeData?.phone ? placeData?.phone : "사장님 전화번호 넣어주세요!!" }</div>
        </StDetailBox>
        <StDetailBox size="placeReviews">
          <br />
          {data
            ?.filter((comment) => comment.shopId == shopId)
            .map((comment) => {
              return (
                <div key={comment.id}>
                  {/* <div>{users.name}</div> */}
                  <strong>
                    name| 별점 {comment.rating.toFixed(1)}| {comment.date}
                  </strong>
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

const SInfoBox = styled.div`
  flex: 1;
  margin: 500px;
`;

const SReviewBox = styled.div`
  flex: 1;
  margin: 30px;
`;

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
