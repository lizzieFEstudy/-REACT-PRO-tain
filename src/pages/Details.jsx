import React from 'react';
import { useLocation } from 'react-router-dom/dist';
import DetailBox from '../components/DetailComp/DetailBox';
import DetailInfo from '../components/DetailComp/DetailInfo';

function Details() {
  const location = useLocation();
  const placeData = location.state?.test1;
  console.log('placeData=>', placeData);


  return (
    <>
      <DetailInfo placeData={placeData} />
      <DetailBox />
    </>
  );
}

export default Details;
