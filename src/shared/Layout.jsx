import React from "react";
import Header from "../components/Header/Header";
import { styled } from "styled-components";

const Layout = ({ children }) => {
  return (
    <>
      <StHeader>
        <Header />
      </StHeader>
      {/* //children부분 이해 못함. 아냐 솔직히 칠드런 개념부터 헷갈린다고 하자. 아니 부모가 자식한테 데이터주는건 아는데.. */}      
      <StLayout>
        <div>{children}</div>
      </StLayout>
    </>
  );
};

export default Layout;
const StHeader = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 999;
`;

const StLayout = styled.div`
  max-width: 1400px;
  min-width: 800px;
  margin: 2px auto;
`;
