import React, { useEffect, useState } from 'react';
import * as S from './KakaoMap.styled';
import Controls from './Controls';
import PlaceResult from './PlaceResult';
import { useNavigate } from 'react-router';

const { kakao } = window;

const getCurrentCoordinate = async () => {
  return new Promise((res, rej) => {
    // HTML5의 geolocaiton으로 사용할 수 있는지 확인합니다.
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다.
      navigator.geolocation.getCurrentPosition(function (position) {
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
  const navigate = useNavigate();
  const CATEGORY_NAMES = ['헬스장', '필라테스', '요가', '댄스', '기타'];
  const [countCategory, setCountCategory] = useState(0);
  const [places, setPlaces] = useState([]);
  const [searchSubmitValue, setSearchSubmitValue] = useState(null);
  const [mapCenter, setMapCenter] = useState({ x: 127.1086228, y: 37.4012191 });

  useEffect(() => {
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    /**
     * 사용자의 현재 위치 얻어오기
     */
    const setInitLocation = async () => {
      let locPosition = await getCurrentCoordinate();

      setMapCenter({
        x: locPosition.La,
        y: locPosition.Ma
      });

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);

      //현재 위치에 마커 표시
      new kakao.maps.Marker({
        position: locPosition,
        map: map
      });

      //   CoordPlaces.refetch();
    };
    setInitLocation();

    /**
     * 헬스장 검색결과 표시
     */
    // const searchMap = () => {
    // 마커를 담을 배열입니다
    let markers = [];
    let currentInfowindow = null;

    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    const ps = new kakao.maps.services.Places(); // 장소 검색 객체를 생성합니다

    // 키워드 검색을 요청하는 함수입니다
    const searchPlaces = async (category, changedCoordinate) => {
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
        // default:
        //   // keyword = category;
        //   keyword = `${category} ${CATEGORY_NAMES[countCategory]}`;
        //   break;
      }

      if (searchSubmitValue) {
        keyword += searchSubmitValue;
        // console.log('키워드 어케되는겨 =>', keyword);
      }

      const currentCoordinate = changedCoordinate ? changedCoordinate : await getCurrentCoordinate();

      //   const bound = new kakao.maps.LatLngBounds();
      const options = {
        location: currentCoordinate,
        // bounds: bound,
        radius: 10000,
        sort: kakao.maps.services.SortBy.DISTANCE
      };

      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps.keywordSearch(keyword, placesSearchCB, options);
    };

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data); // 마커
        setPlaces(data); // 검색 결과 목록
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
      }
    }

    // 마커를 표출하는 함수입니다
    function displayPlaces(places) {
      const bounds = new kakao.maps.LatLngBounds();

      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker();

      for (let i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
        let marker = addMarker(placePosition, i);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        // bounds.extend(placePosition);
        if (searchSubmitValue) {
          bounds.extend(placePosition);
        }

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        ((marker, title, address, phone, categoryName, road_address_name,place_url, placeId, place) => {
          kakao.maps.event.addListener(marker, 'click', function () {
            displayInfowindow(marker, title, address, phone, categoryName, road_address_name,place_url, placeId, place);
          });
        })(
          marker,
          places[i].place_name,
          places[i].address_name,
          places[i].phone,
          places[i].category_name,
          places[i].road_address_name,
          places[i].place_url,
          places[i].id,
          places[i]
        );
      }

      // // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      // map.setBounds(bounds);
      if (searchSubmitValue) {
        map.setBounds(bounds);
      }
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, idx) {
      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
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

      //   const markerLat = marker.getPosition().getLat();
      //   const markerLng = marker.getPosition().getLng();
      //   console.log('마커 좌표:', markerLat, markerLng);

      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    function displayInfowindow(marker, title, address, phone, categoryName, road_address_name, placeId, place) {
      if (currentInfowindow) {
        currentInfowindow.close();
      }
      kakao.maps.event.addListener(marker, 'click', function () {
        displayInfowindow(marker, title, address, phone, categoryName, road_address_name, placeId, place);
      });

      const contentInner = `<div class="infoWindow-wrap">
        <div class="infoWindow-inner">
        <p class="infoWindow-category">${categoryName}</p>
          <h1 class="infoWindow-title">${title}</h1>
          <p class="infoWindow-address">${road_address_name}</p>
          <p class="infoWindow-address">(지번)${address}</p>
          <p class="infoWindow-phone">${phone}</p>
          
          </div>
          <button class="infoWindow-closeBtn">x</button>
          </div>`;

      let content = document.createElement('div');
      content.innerHTML = contentInner;

      let detailBtn = document.createElement('button');
      detailBtn.innerHTML = '상세보기';
      detailBtn.onclick = function () {
        navigate(`/${placeId}`, { state: { test1: place } });  
       
      };

      detailBtn.style.marginTop = '15px'
      detailBtn.style.width= '100%'
      detailBtn.style.backgroundColor = '#f25320';
      detailBtn.style.color = 'white';
      detailBtn.style.padding = '10px';
      detailBtn.style.border = 'none';
      detailBtn.style.cursor = 'pointer';
      content.appendChild(detailBtn);

      const closeBtn = content.querySelector('.infoWindow-closeBtn')
      console.log(closeBtn)

      closeBtn.addEventListener('click',closeInfoWindow)

      function closeInfoWindow(){
        infowindow.close();
        currentInfowindow = null;
      }

      infowindow.setContent(content);
      infowindow.open(map, marker);
      currentInfowindow = infowindow;
    }
    // };

    /**
     * 중심좌표 변경 이벤트
     */
    // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'idle', function () {
      if (searchSubmitValue) return;

      // 지도의  레벨을 얻어옵니다
      //   const level = map.getLevel();

      // 지도의 중심좌표를 얻어옵니다
      const latlng = map.getCenter();

      const lat = latlng.getLat(); // 위도
      const lon = latlng.getLng(); // 경도

      setMapCenter({
        x: lon,
        y: lat
      });

      const coordinate = new kakao.maps.LatLng(lat, lon);
      searchPlaces(CATEGORY_NAMES[countCategory], coordinate);

      //   CoordPlaces.refetch();
    });

    /**
     * 검색 기능
     */
    if (searchSubmitValue) {
      searchPlaces(CATEGORY_NAMES[countCategory]);
    }
  }, [countCategory, searchSubmitValue]);

  return (
    <S.MapLayout>
      <div id="map" style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}></div>

      <div></div>

      <Controls
        CATEGORY_NAMES={CATEGORY_NAMES}
        countCategory={countCategory}
        setCountCategory={setCountCategory}
        setSearchSubmitValue={setSearchSubmitValue}
      />

      <PlaceResult
        CATEGORY_NAMES={CATEGORY_NAMES}
        countCategory={countCategory}
        places={places}
        mapCenter={mapCenter}
      />
    </S.MapLayout>
  );
};

export default KakaoMap;
