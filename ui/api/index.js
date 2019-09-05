import Axios from 'axios';

const likeIdea = (id) => {
  if (!id) return null;

  return Axios({
    data: {},
    method: 'POST',
    url: `/api/ideas/${id}/like`
  });
}

const dislikeIdea = id => {
  if (!id) return null;

  return Axios({
    data: {},
    method: 'POST',
    url: `/api/ideas/${id}/dislike`
  });
};

const createIdea = fields => {
  if (!fields) return null;

  return Axios({
    data: fields,
    method: 'POST',
    url: `/api/ideas`
  });
};


const getAllIdeas = fields => {
  if (!fields) return null;

  return Axios({
    data: fields,
    method: 'GET',
    url: `/api/ideas`
  });
};

export default {
  likeIdea,
  dislikeIdea,
  createIdea,
  getAllIdeas,
};