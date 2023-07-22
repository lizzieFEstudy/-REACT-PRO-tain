import React from 'react';
import { updateComment } from '../../api/comments';
import { useState } from 'react';
import { useMutation} from 'react-query';
import { VscTriangleDown } from 'react-icons/vsc';
import {
  CommentInput,
  StarButton,
  StDropdownCtn,
  StDropdown,
  StDropdownBtn,
  StDropdownContent,
  StDropdownItem,
  StUpdateModalCtn,
  StReviewInfo,
  StCommentButtons,
  StPriceInput
} from './DetailStyles';

const DetailUpdate = ({ item, placeData }) => {
  const [comment, setComment] = useState(item.comment);
  const [rating, setRating] = useState(item.rating);

  const currentPlace = placeData.category_name.split('>').pop().trim();
  console.log('currentPlace=>', currentPlace);
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState(item.selected);
  const showDropdown = () => {
    setIsActive(!isActive);
  };
  const [price, setPrice] = useState(item.price);
  const options = (() => {
    if (currentPlace.includes('헬스')) {
      return [
        '헬스이용권 1개월',
        '헬스이용권 3개월',
        '헬스이용권 6개월',
        '헬스이용권 12개월',
        'PT 10회',
        'PT 20회',
        'PT 30회'
      ];
    } else if (currentPlace.includes('필라테스')) {
      return [
        '필라테스 회원권 1개월',
        '필라테스 회원권 3개월',
        '필라테스 회원권 6개월',
        '필라테스 회원권 12개월',
        'PT 10회',
        'PT 20회',
        'PT 30회',
        '그룹레슨'
      ];
    } else if (currentPlace.includes('요가')) {
      return [
        '요가 회원권 1개월',
        '요가 회원권 6개월',
        '요가 회원권 9개월',
        '요가 회원권 12개월',
        'PT 10회',
        'PT 20회',
        'PT 30회',
        '그룹레슨'
      ];
    } else if (currentPlace.includes('협회') || currentPlace.includes('댄스')) {
      return [
        '댄스 회원권 1개월',
        '댄스 회원권 6개월',
        '댄스 회원권 9개월',
        '댄스 회원권 12개월',
        'PT 10회',
        'PT 20회',
        'PT 30회',
        '그룹레슨'
      ];
    } else {
      return ['죄송합니다. 아직 해당 기관 정보를 받지 못했습니다.'];
    }
  })();

  const addComma = (value) => {
    // 입력된 값에서 숫자 이외의 문자를 모두 제거
    const numericValue = value.replace(/[^\d]/g, '');
    // 콤마 추가한 문자열 생성
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formattedValue;
  };
  const handleChange = (event) => {
    // 1000단위마다 콤마를 추가하여 설정
    setPrice(addComma(event.target.value));
  };
  //가격정보 select창 관련

  const updateMutation = useMutation(updateComment, {
    onSuccess: () => {}
  });

  const updateCommentHandler = async (id) => {
    if (!comment || rating === 0 || !selected || !price) {
      alert('모든 항목을 입력하세요');
      return;
    } else {
      const confirmed = window.confirm('이 댓글을 수정하시겠습니까?');
      if (confirmed) {
        updateMutation.mutate(id);

        const updatedComment = {
          comment,
          rating,
          selected,
          price
        };
        updateMutation.mutate({ id: item.id, updatedComment });
      } else {
        return false;
      }
    }
  };

  const commentHandler = (event) => {
    setComment(event.target.value);
  };

  const handleRatingSelection = (ratingValue) => {
    setRating(ratingValue);
  };

  return (
    <StUpdateModalCtn>
      <StReviewInfo>리뷰를 수정해주세요!!</StReviewInfo>
      <br />
      <div>
        <StarButton active={rating >= 1} onClick={() => handleRatingSelection(1)}>
          ★
        </StarButton>
        <StarButton active={rating >= 2} onClick={() => handleRatingSelection(2)}>
          ★
        </StarButton>
        <StarButton active={rating >= 3} onClick={() => handleRatingSelection(3)}>
          ★
        </StarButton>
        <StarButton active={rating >= 4} onClick={() => handleRatingSelection(4)}>
          ★
        </StarButton>
        <StarButton active={rating >= 5} onClick={() => handleRatingSelection(5)}>
          ★
        </StarButton>
      </div>
      <StDropdownCtn>
        <StDropdown>
          <StDropdownBtn onClick={showDropdown}>
            {selected || '가격정보를 입력해주세요!!'}
            <VscTriangleDown />
            {isActive && (
              
              <StDropdownContent>
                {options.map((option) => (
                  <StDropdownItem
                    onClick={(event) => {
                      setSelected(option);
                      setIsActive(false);
                    }}
                  >
                    {option}
                  </StDropdownItem>
                ))}
              </StDropdownContent>
            )}
          </StDropdownBtn>
        </StDropdown>
        <StPriceInput type="text" value={price} onChange={(event) => handleChange(event)} placeholder="ex) 3,00,000 ₩" />
      </StDropdownCtn>

      <CommentInput
        type="text"
        value={comment}
        onChange={(event) => commentHandler(event)}
        placeholder="리뷰를 입력해 주세요!!!"
      />
      <StCommentButtons onClick={updateCommentHandler}>수정하기</StCommentButtons>
    </StUpdateModalCtn>
  );
};

export default DetailUpdate;
