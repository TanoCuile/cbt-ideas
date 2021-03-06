import Axios from 'axios';

const likeIdea = id => {
  if (!id) return null;

  return Axios({
    data: {},
    method: 'POST',
    url: `/api/ideas/${id}/like`,
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

const getAllIdeas = () => {
  return Axios({
    method: 'GET',
    url: `/api/ideas`,
  });
};

const getIdea = (id) => {
  return Axios({
    method: 'GET',
    url: `/api/ideas/${id}`
  });
}

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
const getUserInfo = () => {
  return Axios({
    method: 'GET',
    url: '/api/user',
  });
};

export default {
  likeIdea,
  dislikeIdea,
  createIdea,
  getAllIdeas,
  getIdeaComments,
  saveComment,
  getUserInfo,
  getIdea,
};

// function testAPI() {
//   let ideaId;
//   authUser();
//   createIdea({
//     title: 'Blah1',
//     description: 'BLAH BLAH1',
//     likes: 0,
//     dislikes: 0,
//     owner: '1',
//     usersWhoLiked: [],
//     usersWhoDisliked: [],
//   })
//     .then(resp => {
//       ideaId = resp.data.id;
//     })
//     .then(() => getAllIdeas())
//     .then(resp => {})
//     .then(() => likeIdea(ideaId))
//     .then(resp => {
//       console.log(resp);
//     })
//     .then(() => dislikeIdea(ideaId))
//     .then(resp => {
//       console.log(resp);
//     })
//     .then(() =>
//       saveComment({
//         ideaId,
//         commentData: {
//           message: 'Super',
//           ideaId: '1',
//           userId: '1',
//           mensionedUsers: [],
//         },
//       }),
//     )
//     .then(resp => {
//       console.log(resp);
//     })
//     .then(() => getIdeaComments(ideaId))
//     .then(resp => {
//       console.log(resp);
//     });
// }
