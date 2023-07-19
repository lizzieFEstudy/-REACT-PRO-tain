import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UseSelector } from 'react-redux';
import styled from 'styled-components';
import { getComments, addComment, deleteComment, updateComment } from '../../api/comments';

function DetailBox() {
  const navigate = useNavigate();

  const params = useParams();

  return (
    <>
      <SInfoBox>
        <h1>Protein Gym</h1>
        <div>⭐️ 7.5/10 방문자 리뷰 300</div>
      </SInfoBox>

      <SReviewBox>
        <h1>Reviews..</h1>
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
