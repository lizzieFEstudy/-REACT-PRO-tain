import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UseSelector } from 'react-redux';
import styled from 'styled-components';
import { getComments, addComment, deleteComment, updateComment } from '../../api/comments';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { auth } from '../../firebase';

function DetailBox() {
  const navigate = useNavigate();

  const params = useParams();

  const [nickName, SetNickName] = useState();
  const [comment, SetComment] = useState();
  const { isLoading, isError, data } = useQuery('comments', getComments);
  const { id } = params;

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

  const addCommentHandler = async (e) => {
    e.preventDefault();

    if (comment) {
      const newComment = {
        // id: id,
        nickName,
        comment,
        userId: auth.currentUser.uid
      };

      mutation.mutate(newComment);

      SetNickName('');
      SetComment('');
    } else {
      alert('모든 항목을 입력하세요');
    }
  };

  const deleteCommentHandler = (id) => {
    const confirmed = window.confirm('이 댓글을 삭제하시겠습니까?');
    if (confirmed) {
      deleteMutation.mutate(id);
    }
  };

  const commentHandler = (e) => {
    SetComment(e.target.value);
  };

  return (
    <>
      <SInfoBox>
        <h1>Protein Gym</h1>
        <div>⭐️ 7.5/10 방문자 리뷰 300</div>
      </SInfoBox>

      <SReviewBox>
        <h1>Reviews..</h1>
        <br />
        <CommentInput type="text" value={comment} onChange={commentHandler} placeholder="내용을 입력하세요." />
        <button onClick={addCommentHandler}>등록</button>
        <br />
        <div>name| 별점 7.8| 22.04.05</div>
        <button>수정</button>
        <button>삭제</button>
        <div>comment...comment...comment...</div>
      </SReviewBox>
    </>
  );
}

export default DetailBox;

const SInfoBox = styled.div`
  flex: 1;
  margin: 30px;
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
  width: 500px;
  height: 30px;
  padding: 5px;
  color: white;
`;
