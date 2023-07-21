//component 분리 예정

import React from 'react';
import { css, styled } from 'styled-components';

const DetailInfo = ({ placeData, data }) => {
  return (
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
        <div>영업시간 정보는 API에서 제공 안함</div>
        <div>{placeData?.phone}</div>
      </StDetailBox>
      <StDetailBox size="placeReviews">
        {data
          ?.filter((comment) => comment.shopId == placeData?.shopId)
          .map((comment) => {
            return (
              <div key={comment.id}>
                <div>name| 별점 7.8| 22.04.05</div>
                <div>{comment.comment}</div>
              </div>
            );
          })}
      </StDetailBox>
    </StDetailPage>
  );
};

export default DetailInfo;

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
