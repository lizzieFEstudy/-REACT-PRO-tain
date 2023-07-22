import React, { useEffect, useState } from 'react';
import * as S from './KakaoMap.styled';
import { Link } from 'react-router-dom/dist';
import { FaCaretRight } from 'react-icons/fa';
import { FcRating, FcShop, FcCollaboration } from 'react-icons/fc';
import { getCoord } from '../../api/map';
import { useQuery } from 'react-query';
import Slider from 'react-slick';

const PlaceResult = ({ places, CATEGORY_NAMES, countCategory, mapCenter }) => {
  const [isFold, setIsFold] = useState(false);

  // 행정구역정보와 카테고리를 이용하여 장소 검색
  const CoordPlaces = useQuery('coord', () => getCoord(mapCenter.x, mapCenter.y, CATEGORY_NAMES[countCategory]));
  useEffect(() => {
    CoordPlaces.refetch();
  }, [mapCenter]);
  const coord = CoordPlaces.data?.coord;
  const coordPlaces = CoordPlaces.data?.places;
  //   console.log('0. 카카오지도 로컬 axios 테스트 => ', CoordPlaces);
  //   console.log('1. 카카오지도 로컬 axios 테스트 => ', coord.region_3depth_name);
  //   console.log('2. 카카오지도 로컬 axios 테스트 => ', coordPlaces);

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
          {CoordPlaces.data?.coord.region_3depth_name} <br />
          {CATEGORY_NAMES[countCategory]}
          <b>TOP5</b>
          <i>
            <FcShop />
          </i>
        </strong>
        <ol>
          <li>
            <p>피트니스킹콩</p>
            <span>
              <span>⭐⭐⭐⭐⭐ 7.5</span>
            </span>
          </li>
          <li>
            <p>스타앤팀에이스 퍼스널트레이닝</p>
            <span>
              <span>⭐⭐⭐⭐⭐ 7.0</span>
            </span>
          </li>
          <li>
            <p>스타333앤팀에이스 퍼스널트레이닝</p>
            <span>
              <span>⭐⭐⭐⭐⭐ 7.0</span>
            </span>
          </li>
          <li>
            <p>스타444앤팀에이스 퍼스널트레이닝</p>
            <span>
              <span>⭐⭐⭐⭐⭐ 7.0</span>
            </span>
          </li>
          <li>
            <p>스타555앤팀에이스 퍼스널트레이닝</p>
            <span>
              <span>⭐⭐⭐⭐⭐ 7.0</span>
            </span>
          </li>
        </ol>
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
