import api from '../api';

const addLikeToIdea = (id) => {
  return dispatch => {

    dispatch({
      type: 'ADD_LIKE_TO_IDEA_ATTEMPT',
      content: {
        id
      }
    })

    return api.likeIdea(id)
      .then(status => {
        return dispatch({
          type: 'ADD_LIKE_TO_IDEA_SUCCESS',
          content: {
            id,
          },
        });
      })
  }
}

const addDislikeToIdea = (id) => {

  return dispatch => {
    dispatch({
      type: 'ADD_DISLIKE_TO_IDEA_ATTEMPT',
      content: {
        id,
      },
    });

    return api.dislikeIdea(id).then(status => {
      return dispatch({
        type: 'ADD_DISLIKE_TO_IDEA_SUCCESS',
        content: {
          id,
        },
      });
    });
  };
}


export default {
  addLikeToIdea,
  addDislikeToIdea,
};