import React, { useState } from 'react';
import * as S from './KakaoMap.styled';
import { Link } from 'react-router-dom/dist';
import { FaCaretRight } from 'react-icons/fa';

const PlaceResult = ({ places, CATEGORY_NAMES, countCategory }) => {
  const [isFold, setIsFold] = useState(false);

  return (
    <S.PlacesBox className={isFold == true ? 'isFold' : null}>
      <S.PlaceFoldBtn
        title="리스트 작게보기"
        onClick={() => {
          setIsFold(!isFold);
        }}
      >
        <FaCaretRight />
      </S.PlaceFoldBtn>
      <S.PlaceRank>
        <strong>
          ㅇㅇ동&nbsp;
          {CATEGORY_NAMES[countCategory]}
          <br />
          TOP 5
        </strong>
      </S.PlaceRank>
      <S.PlaceList>
        {places.map((place, index) => {
          return (
            <li key={`${index}_${place.id}`}>
              <S.PlaceItemCategory>{place.category_name}</S.PlaceItemCategory>
              <S.PlaceItemTitle>
                <Link to={`/${place.id}`} state={{ test1: place }}>
                  {place.place_name}
                </Link>
              </S.PlaceItemTitle>

              {place.road_address_name ? (
                <S.PlaceItemRoadAddress>{place.road_address_name}</S.PlaceItemRoadAddress>
              ) : null}
              <S.PlaceItemAddress>(지번) {place.address_name}</S.PlaceItemAddress>
              <S.PlaceItemPhone>{place.phone}</S.PlaceItemPhone>
            </li>
          );
        })}
      </S.PlaceList>
    </S.PlacesBox>
  );
};

export default PlaceResult;
