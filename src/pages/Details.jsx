import React from 'react';
import { useLocation } from 'react-router-dom/dist';
import DetailBox from '../components/DetailComp/DetailBox';

function Details() {
  const location = useLocation();
  const placeData = location.state?.test1;
  console.log(placeData);

  return <DetailBox />;
}

export default Details;
