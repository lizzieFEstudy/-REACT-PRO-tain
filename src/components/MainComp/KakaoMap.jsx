import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom/dist';
import * as S from './KakaoMap.styled';
import { TbYoga } from 'react-icons/tb';
import { GiMuscularTorso, GiAbstract020, GiMusicalNotes } from 'react-icons/gi';
import { FaHeart, FaCaretRight } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

const InfoDiv = styled.div`
  padding: 15px;
`;
const SearchWrap = styled.div`
  width: 30%;
  background-color: #fff;
`;

const { kakao } = window;

const getCurrentCoordinate = async () => {
  //   console.log('1. getCurrentCoordinate 함수 실행!!!');
  //   console.log('2. navigator.geolocation', navigator.geolocation);

  return new Promise((res, rej) => {
    // HTML5의 geolocaiton으로 사용할 수 있는지 확인합니다.
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다.
      navigator.geolocation.getCurrentPosition(function (position) {
        // console.log(position);
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도

        const coordinate = new kakao.maps.LatLng(lat, lon);
        res(coordinate);
      });
    } else {
      rej(new Error('현재 위치를 불러올 수 없습니다.'));
    }
  });
};

const KakaoMap = () => {
  const [selectedCategory, setSelectedCategory] = useState('헬스장');

  const [countCategory, setCountCategory] = useState(0);
  const CATEGORY_NAMES = ['헬스장', '필라테스', '요가', '댄스', '기타'];
  const CATEGORY_ICONS = [<GiMuscularTorso />, <TbYoga />, <GiAbstract020 />, <GiMusicalNotes />, <FaHeart />];
  const [places, setPlaces] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isFold, setIsFold] = useState(false);

  const handleCategoryButtonClick = (event, index) => {
    setCountCategory(index);
    setSelectedCategory(CATEGORY_NAMES[index]);
  };

  useEffect(() => {
    // setPlaces([])

    // //드래그 막기
    // map.setDraggable(false);
    // //줌 막기
    // map.setZoomable(false);

    /**
     * 사용자의 현재 위치 얻어오기
     */
    const setInitLocation = async () => {
      let locPosition = await getCurrentCoordinate();
      // console.log('3. locPosition', locPosition);
      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);

      //현재 위치에 마커 표시
      const marker = new kakao.maps.Marker({
        position: locPosition,
        map: map
      });
    };
    setInitLocation();

    /**
     * 헬스장 검색결과 표시
     */
    // 마커를 담을 배열입니다
    var markers = [];
    var currentInfowindow = null;

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places();

    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    // 키워드 검색을 요청하는 함수입니다
    // const searchPlaces = async (changedCoordinate) => {
    //   // var keyword = window.prompt('입력ㄱ', '헬스장');
    //   let keywords = ['헬스장', '필라테스','요가','댄스'];

    const searchPlaces = async (category, changedCoordinate) => {
      // var keyword = window.prompt('입력ㄱ', '헬스장');
      let keyword = '';
      switch (category) {
        case '헬스장':
          keyword = '헬스장';
          break;
        case '필라테스':
          keyword = '필라테스';
          break;
        case '요가':
          keyword = '요가';
          break;
        case '댄스':
          keyword = '댄스';
          break;
        default:
          keyword = '헬스장';
          break;
      }

      const currentCoordinate = changedCoordinate ? changedCoordinate : await getCurrentCoordinate();

      // const bound = kakao.maps.LatLngBounds();
      const options = {
        location: currentCoordinate,
        //   bounds: bound,
        radius: 10000,
        sort: kakao.maps.services.SortBy.DISTANCE
      };

      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      // for (let keyword of keywords) {
      //   ps.keywordSearch(keyword, placesSearchCB, options);
      // }
      ps.keywordSearch(keyword, placesSearchCB, options);
    };

    // 키워드로 장소를 검색합니다

    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    //   searchPlaces();

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      // console.log('테스트 데이터 => ', data);
      setPlaces(data);

      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);
        // setPlaces(data)
        // // 페이지 번호를 표출합니다
        // displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
      }
    }

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    function displayPlaces(places) {
      var listEl = document.getElementById('placesList'),
        menuEl = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = '';

      // // 검색 결과 목록에 추가된 항목들을 제거합니다
      removeAllChildNods(listEl);
      console.log(listEl);
      console.log(places);

      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker();

      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = addMarker(placePosition, i),
          itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        // bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function (marker, title, address, phone, categoryName) {
          kakao.maps.event.addListener(marker, 'click', function () {
            displayInfowindow(marker, title, address, phone, categoryName);
          });

          // kakao.maps.event.addListener(marker, 'mouseout', function () {
          //   infowindow.close();
          // });

          // itemEl.onmouseout = function () {
          //   infowindow.close();
          // };
        })(marker, places[i].place_name, places[i].address_name, places[i].phone, places[i].category_name);

        fragment.appendChild(itemEl);
      }

      // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
      listEl.appendChild(fragment);
      menuEl.scrollTop = 0;

      // // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      // map.setBounds(bounds);
    }

    // 검색결과 항목을 Element로 반환하는 함수입니다
    function getListItem(index, places) {
      console.log('검색결과 항목 => ', places);
      var el = document.createElement('li'),
        itemStr =
          '<span class="markerbg marker_' +
          (index + 1) +
          '"></span>' +
          '<div class="info">' +
          '   <h5>' +
          places.place_name +
          '</h5>';

      if (places.road_address_name) {
        itemStr +=
          '    <span>' +
          places.road_address_name +
          '</span>' +
          '   <span class="jibun gray">' +
          places.address_name +
          '</span>';
      } else {
        itemStr += '<span>' + places.address_name + '</span>';
      }

      itemStr += '<span class="tel">' + places.phone + '</span>' + '</div>';

      el.innerHTML = itemStr;
      el.className = 'item';

      return el;
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, idx) {
      var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage
        });

      marker.setMap(map); // 지도 위에 마커를 표출합니다
      markers.push(marker); // 배열에 생성된 마커를 추가합니다

      const markerLat = marker.getPosition().getLat();
      const markerLng = marker.getPosition().getLng();

      console.log('마커 좌표:', markerLat, markerLng);

      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    function displayInfowindow(marker, title, address, phone, categoryName) {
      if (currentInfowindow) {
        currentInfowindow.close();
      }
      const content = `<div style="padding : 0px 0px 20px 0px; width: 272px;">
        <div style="background : orange; padding : 10px 0px">
          <h1>${title}</h1>
          <p style="font-size:12px; letter-spacing:-2px">${categoryName}</p>
          </div>
          <p>${address}</p>
          <p>${phone}</p>
          <a href="">상세보기</a>
          </div>`;
      infowindow.setContent(content);
      infowindow.open(map, marker);
      currentInfowindow = infowindow;
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    }

    /**
     * 중심좌표 변경 이벤트
     */
    // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
    // kakao.maps.event.addListener(map, 'idle', function () {
    //   // 지도의  레벨을 얻어옵니다
    //   var level = map.getLevel();

    //   // 지도의 중심좌표를 얻어옵니다
    //   var latlng = map.getCenter();

    //   const lat = latlng.getLat(); // 위도
    //   const lon = latlng.getLng(); // 경도

    //   const coordinate = new kakao.maps.LatLng(lat, lon);

    //   searchPlaces(coordinate);
    // });
    searchPlaces(selectedCategory);
  }, [selectedCategory]);

  return (
    <S.MapLayout>
      <div id="map" style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}></div>

      <S.ControlsBox>
        <S.ControlsHeader>
          <h1>
            <Link to={'/'}>💪PROtein</Link>
          </h1>
          <div>
            <button>로그인관련</button>
          </div>
        </S.ControlsHeader>
        <S.ControlsSearch>
          <form>
            <input
              type="text"
              placeholder="장소, 주소 검색"
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
              }}
            />
            <button title="검색" className={searchText ? 'active' : null}>
              <FiSearch />
            </button>
          </form>
        </S.ControlsSearch>
        <S.ControlsCategory>
          {/* <div>
            <button onClick={() => setSelectedCategory('헬스장')}>헬스장</button>
            <button onClick={() => setSelectedCategory('필라테스')}>필라테스</button>
            <button onClick={() => setSelectedCategory('요가')}>요가</button>
            <button onClick={() => setSelectedCategory('댄스')}>댄스</button>
          </div> */}
          <ul>
            {CATEGORY_NAMES.map((char, index) => {
              return (
                <li
                  key={'selectCategory_' + index + char}
                  className={countCategory === index ? 'active' : null}
                  title={countCategory === index ? '클릭됨' : null}
                >
                  <button type="button" onClick={(e) => handleCategoryButtonClick(e, index)}>
                    <div>{CATEGORY_ICONS[index]}</div>
                    {char}
                  </button>
                </li>
              );
            })}
          </ul>
        </S.ControlsCategory>
      </S.ControlsBox>

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
            //   console.log('쟉스의 place => ', place);
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
      <div id="menu_wrap" style={{ display: 'none' }}>
        <ul id="placesList"></ul>
        <div id="pagination"></div>
      </div>
    </S.MapLayout>
  );
};

export default KakaoMap;
