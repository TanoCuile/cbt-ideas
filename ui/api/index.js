import Axios from 'axios';

const likeIdea = id => {
  if (!id) return null;

  return Axios({
    data: {},
    method: 'POST',
    // url: `/api/ideas/${id}/like`,
    url: `/api/ideas/0/like`,
  });
};

const dislikeIdea = id => {
  if (!id) return null;

  return Axios({
    data: {},
    method: 'POST',
    url: `/api/ideas/${id}/dislike`,
  });
};

const createIdea = fields => {
  if (!fields) return null;

  return Axios({
    data: fields,
    method: 'POST',
    url: `/api/ideas`,
  });
};

const getAllIdeas = fields => {
  if (!fields) return null;

  return Axios({
    data: fields,
    method: 'GET',
    url: `/api/ideas`,
  });
};

const getIdeaComments = ideaId => {
  if (!ideaId) return null;

  return Axios({
    method: 'GET',
    url: `/api/comments/${ideaId}`,
  });
};

const saveComment = ({ ideaId, commentData }) => {
  if (!ideaId || !commentData) return null;

  return Axios({
    method: 'POST',
    data: commentData,
    url: `/api/comments/${ideaId}`,
  });
};

export default {
  likeIdea,
  dislikeIdea,
  createIdea,
  getAllIdeas,
  getIdeaComments,
  saveComment,
};
