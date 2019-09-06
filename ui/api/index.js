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
testAPI();

export default {
  likeIdea,
  dislikeIdea,
  createIdea,
  getAllIdeas,
  getIdeaComments,
  saveComment,
};

function testAPI() {
  let ideaId;
  const token = getTockenFromQuery();
  if (token) {
    const exdays = 1;
    const cookieName = 'ct_tok';
    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + currentDate.toUTCString();

    document.cookie = cookieName + '=' + token + ';' + expires + ';path=/';
  }
  createIdea({
    title: 'Blah1',
    description: 'BLAH BLAH1',
    likes: 0,
    dislikes: 0,
    owner: '1',
    usersWhoLiked: ['2'],
    usersWhoDisliked: ['3'],
  })
    .then(resp => {
      ideaId = resp.data._id;
    })
    .then(() => getAllIdeas())
    .then(resp => {})
    .then(() => likeIdea(ideaId))
    .then(resp => {
      console.log(resp);
    })
    .then(() => dislikeIdea(ideaId))
    .then(resp => {
      console.log(resp);
    })
    .then(() =>
      saveComment({
        ideaId,
        commentData: {
          message: 'Super',
          ideaId: '1',
          userId: '1',
          mensionedUsers: [],
        },
      }),
    )
    .then(resp => {
      console.log(resp);
    })
    .then(() => getIdeaComments(ideaId))
    .then(resp => {
      console.log(resp);
    });
}
function getTockenFromQuery() {
  const query = window.location.href.split('?')[1];
  if (query) {
    const queryParams = query.split('&').reduce((total, piece) => {
      const [key, value] = piece.split('=');
      total[key] = value;
      return total;
    }, {});

    return queryParams.ct_tok;
  }
}
