import React, { useState } from 'react';
import * as S from './KakaoMap.styled';
import { Link } from 'react-router-dom/dist';
import { TbYoga } from 'react-icons/tb';
import { GiMuscularTorso, GiAbstract020, GiMusicalNotes } from 'react-icons/gi';
import { FaHeart } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

const Controls = ({ CATEGORY_NAMES, countCategory, setCountCategory, setSearchSubmitValue }) => {
  const CATEGORY_ICONS = [<GiMuscularTorso />, <TbYoga />, <GiAbstract020 />, <GiMusicalNotes />, <FaHeart />];
  const [searchText, setSearchText] = useState('');

  const handleCategoryButtonClick = (index) => {
    setSearchSubmitValue(null);
    setCountCategory(index);
    setSearchText('');
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setSearchSubmitValue(searchText);
    // setCountCategory(-1);
    // searchPlaces(selectedCategory);
  };

  return (
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
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            placeholder={`${CATEGORY_NAMES[countCategory]} 장소 검색`}
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
        <ul>
          {CATEGORY_NAMES.map((char, index) => {
            return (
              <li
                key={'selectCategory_' + index + char}
                className={countCategory === index ? 'active' : null}
                title={countCategory === index ? '클릭됨' : null}
              >
                <button type="button" onClick={() => handleCategoryButtonClick(index)}>
                  <div>{CATEGORY_ICONS[index]}</div>
                  {char}
                </button>
              </li>
            );
          })}
        </ul>
      </S.ControlsCategory>
    </S.ControlsBox>
  );
};

export default Controls;
