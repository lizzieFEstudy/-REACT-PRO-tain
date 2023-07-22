import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UseSelector } from 'react-redux';
import { getComments, addComment, deleteComment, updateComment } from '../../api/comments';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { auth } from '../../firebase';
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

  const { data: userData } = useQuery('users', getUsers, {
    onSuccess: (userData) => {
      console.log('Fetched userData:', userData);
    }
  });

  const shopId = params.id;
  console.log('shopId=>', shopId);
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

  const addCommentHandler = async (e) => {
    e.preventDefault();

    if (!comment || rating === 0) {
      alert('모든 항목을 입력하세요');
      return;
    }

    const newComment = {
      shopId,
      comment,
      rating,
      userId: auth.currentUser.uid,
      createdAt: new Date().toISOString()
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

  const getUserName = (userId) => {
    const user = userData?.find((user) => user.id === userId);
    return user?.name || 'Unknown User'; // Return 'Unknown User' if user is not found
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString('ko-KR', options);
  };

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
            ?.filter((comment) => comment.shopId === shopId)
            .map((comment) => {
              const formattedDate = formatDate(comment.createdAt);
              const isEditing = editMode && editCommentId === comment.id;
              return (
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
