import React from 'react';
import { useLocation } from 'react-router-dom/dist';

function Details() {
  const location = useLocation();
  const placeData = location.state?.test1;
  console.log(placeData);

  return <div>Details</div>;
}

export default Details;
