import api from '../axios/api';

// axios 요청이 들어가는 모든 모듈

// 조회
const getComments = async () => {
  const response = await api.get(`/comments`);
  console.log(response.data);
  return response.data;
};

// 추가
const addComment = async (newComment) => {
  await api.post(`/comments`, newComment);
};

// 삭제

const deleteComment = async (id) => {
  await api.delete(`/comments/${id}`);
};

// 수정
const updateComment = async ({ id, updatedComment }) => {
  await api.patch(`/comments/${id}`, updatedComment);
};

export { getComments, addComment, deleteComment, updateComment };
