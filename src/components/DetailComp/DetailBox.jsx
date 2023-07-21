import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { getComments, addComment, deleteComment, updateComment } from '../../api/comments';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { auth } from '../../firebase';
import { addShops, getShops, updateShops } from '../../api/shops';

function DetailBox( { placeData }) {

  const params = useParams();

  const [nickName, setNickName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const { isLoading, isError, data } = useQuery('comments', getComments);
  console.log("data=>",data?.map((item) => item.id))
  const shopId = params.id;
  //shop등록용
  // const { isLoading: shopLoading, isError: shopError, data: shopData } = useQuery('shops', getShops);

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
  /////shop 등록용 mutation-동준-/////
  // const addShopMutation = useMutation(addShops, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('shops');
  //     alert('신규 shop 등록 성공');
  //   },
  //   onError: () => {
  //     alert('신규 shop 등록 에러');
  //   }
  // });

  // const updateShopMutation = useMutation(updateShops, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('shops');
  //     alert('shop 업데이트 성공');
  //   },
  //   onError: () => {
  //     alert('shop 업데이트 에러');
  //   }
  // });

  /////shop 등록용 mutation-동준-////
  // console.log("shopData=>",shopData?.map((item)=> item.id))

  const addCommentHandler = async (e) => {
    e.preventDefault();

    if (!comment || rating === 0) {
      alert('모든 항목을 입력하세요');
      return;
    }

    const newComment = {
      shopId,
      nickName,
      comment,
      rating, // Save the selected rating in the new comment object
      userId: auth.currentUser.uid
    };

    mutation.mutate(newComment);

    setNickName('');
    setComment('');
    setRating(0); // Reset rating after adding the comment
  };

  const deleteCommentHandler = (id) => {
    const confirmed = window.confirm('이 댓글을 삭제하시겠습니까?');
    if (confirmed) {
      deleteMutation.mutate(id);
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

  // const addShopHandler = async () => {
  //   if (!shopLoading) {
  //     const shopExists = shopData?.some((item) => item.id === shopId);
  //     if (!shopExists) {
  //       const newShop = {
  //         id: shopId,
  //         comment: [Number(rating)]
  //       };
  //       addShopMutation.mutate(newShop);
  //     } else {
  //       const shopToUpdate = shopData.find((item) => item.id === shopId);
  //       const updatedShop = {
  //         ...shopToUpdate,
  //         comment: [...shopToUpdate.comment, Number(rating)]
  //       };
  //       updateShopMutation.mutate({ shopId, updatedShop });
  //     }
  //   }
  // };

  return (
    <>
      <StDetailPage style={{ marginTop: '100px' }}>
        <StDetailBox size="placeTitle">
          <div>{placeData?.place_name}</div>
          <StReviewCountBox>
            <div>별점자리</div>
            <div>방문자 리뷰</div>
          </StReviewCountBox>
        </StDetailBox>
        <StDetailBox size="placeDetail">
          <div>{placeData?.road_address_name}</div>
          <div>{placeData?.phone}</div>
        </StDetailBox>
        <StDetailBox size="placeReviews">
          <br />
          {data
            ?.filter((comment) => comment.shopId == shopId)
            .map((comment) => {
              return (
                <div key={comment.id}>
                  {/* <div>{users.name}</div> */}
                  <div>name| 별점 7.8| 22.04.05</div>
                  <button
                    onClick={() => {
                      updateCommentHandler(comment.id);
                    }}
                  >
                    수정
                  </button>
                  <button
                    onClick={() => {deleteCommentHandler(comment.id)}}
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
            {/* Star rating selection buttons */}
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
}

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