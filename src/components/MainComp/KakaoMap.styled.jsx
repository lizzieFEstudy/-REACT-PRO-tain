import styled from 'styled-components';

export const MapLayout = styled.div`
  overflow: hidden;
  position: absolute;
  top: 5rem;
  left: 0;
  width: 100%;
  height: 100%;

  .testClass {
    background: #fab;
  }
`;

// 컨트롤러
export const ControlsBox = styled.div`
  overflow: hidden;
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 10;
  width: 360px;
  border: 2px solid #f25320;
  border-radius: 8px;
  background: #fff;
  /* box-shadow: 0 1px 4px 0 rgba(0,0,0,.1); */
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2), 5px 0 15px 0 rgba(0, 0, 0, 0.1);
`;

export const ControlsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 20px;
  background: #f25320;

  h1 > a {
    font-family: 'Luckiest Guy';
    font-size: 26px;
    text-decoration: none;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    color: #fff;
  }
`;

export const ControlsSearch = styled.div`
  padding: 0 20px;

  form {
    display: flex;
    padding: 14px 0 12px;
    border-bottom: 2px solid #f5f5f6;

    input {
      flex: 1;
      height: 28px;
      padding-top: 4px;
      border: 0;
      font-size: 16px;
      color: #212529;
      outline: none;

      &::placeholder {
        color: #b8bfc4;
      }
    }

    button {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 44px;
      margin-left: auto;
      border: 0;
      font-size: 24px;
      background: transparent;
      color: #b8bfc4;
      cursor: pointer;

      &.active {
        color: #f25320;
        transition: all 300ms;
      }
    }
  }
`;

export const ControlsCategory = styled.div`
  padding: 20px 20px 24px;

  ul {
    display: flex;
    justify-content: space-between;

    > li {
      flex: 1;
      text-align: center;

      button {
        border: 0;
        font: inherit;
        font-size: 13px;
        letter-spacing: -0.03em;
        color: #212529;
        background: transparent;
        cursor: pointer;

        > div {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 48px;
          height: 48px;
          margin-bottom: 8px;
          border-radius: 19px;
          font-size: 24px;
          background: #f5f7f7;
          color: #303538;
        }
      }

      &.active {
        button {
          font-weight: 600;
          color: #f25320;
          > div {
            background: #f25320;
            color: #fff;
            font-size: 26px;
          }
        }
      }
    }
  }
`;

// 장소 결과
export const PlacesBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  width: 380px;
  height: 100%;
  background: #f5f7f7;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2), 5px 0 15px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.4s;

  &.isFold {
    transform: translateX(+100%);
  }
`;

export const PlaceFoldBtn = styled.button`
  position: absolute;
  left: 0;
  top: 50%;
  z-index: 20;
  width: 24px;
  height: 58px;
  border: 0;
  border-radius: 4px 0 0 4px;
  background: #fff;
  transform: translate(-23px, -50%);
  box-shadow: -4px 1px 4px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

export const PlaceRank = styled.div`
  display: flex;
  box-sizing: border-box;
  min-height: 72px;
  margin-bottom: 8px;
  padding: 14px 20px;
  background: #fff;

  > strong {
    box-sizing: border-box;
    position: relative;
    min-width: 160px;
    padding-left: 46px;
    font-size: 15px;
    font-weight: bold;
    line-height: 1.33;
    color: #212529;

    > b {
      margin-left: 4px;
      color: #f25320;
    }
    > i {
      display: flex;
      position: absolute;
      top: 50%;
      left: -2px;
      transform: translateY(-50%);
      font-size: 36px;
    }
  }
  ol {
    overflow: hidden;
    display: flex;
    flex: 1;
    flex-direction: column;
    flex-wrap: wrap;
    height: 44px;
    counter-reset: rank-number;

    > li {
      box-sizing: border-box;
      position: relative;
      width: 180px;
      height: 100%;
      padding: 0 8px 0 30px;
      border-left: 2px solid #f5f5f6;
      line-height: 1.33;
      counter-increment: rank-number;

      &:before {
        content: counter(rank-number);
        position: absolute;
        top: 50%;
        left: 8px;
        font-size: 22px;
        font-style: italic;
        font-weight: 600;
        color: #b8bfc4;
        opacity: 0.6;
        transform: translateY(-50%);
      }

      > p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
        font-weight: 600;
      }
    }
  }
`;

export const PlaceList = styled.ul`
  flex: 1;
  overflow-y: auto;
  background: #fff;

  > li {
    position: relative;
    padding: 20px;
    letter-spacing: -0.02em;

    &::after {
      content: '';
      transform: translateY(20px);
      display: block;
      border-bottom: 1px solid #f3f6f7;
      border-bottom: 2px solid #f5f5f6;
    }

    &:hover {
      background: #f5f7f7;
    }
  }
`;

export const PlaceItemCategory = styled.span`
  display: inline-block;
  margin-bottom: 6px;
  vertical-align: top;
  border-radius: 5px;
  letter-spacing: 0;
  font-size: 13px;
  font-weight: 600;
  line-height: 16px;
  color: #a3aab0;
`;
export const PlaceItemTitle = styled.strong`
  display: block;
  margin-top: 2px;

  a {
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
    /* color: #212529; */
    color: #2b8ef9;
  }
`;
export const PlaceItemRoadAddress = styled.span`
  display: block;
  margin-top: 14px;
  font-size: 13px;
`;
export const PlaceItemAddress = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 13px;
  /* color: #808991; */
`;
export const PlaceItemPhone = styled.span`
  display: block;
  margin-top: 14px;
  font-size: 13px;
`;
