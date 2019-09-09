import api from '../api';

const addLikeToIdea = id => {
  return dispatch => {
    dispatch({
      type: 'ADD_LIKE_TO_IDEA_ATTEMPT',
      content: {
        id,
      },
    });

    return api.likeIdea(id).then(({ data }) => {
      return dispatch({
        type: 'ADD_LIKE_TO_IDEA_SUCCESS',
        content: data,
      });
    });
  };
};

const addDislikeToIdea = id => {
  return dispatch => {
    dispatch({
      type: 'ADD_DISLIKE_TO_IDEA_ATTEMPT',
      content: {
        id,
      },
    });

    return api.dislikeIdea(id).then(({ data }) => {
      return dispatch({
        type: 'ADD_DISLIKE_TO_IDEA_SUCCESS',
        content: data,
      });
    });
  };
};

const getIdeas = () => {
  return dispatch => {
    dispatch({
      type: 'GET_ALL_IDEAS_ATTEMPT',
    });

    return api.getAllIdeas().then(({ data }) => {
      return dispatch({
        type: 'GET_ALL_IDEAS_SUCCESS',
        content: data,
      });
    });
  };
};

const getIdea = (id) => dispatch => {
  dispatch({
    type: 'GET_IDEA_ATTEMPT'
  });

  api.getIdea(id).then(({ data }) => {
    dispatch({
      type: 'GET_IDEA_SUCCESS',
      content: data
    })
  });
}

const createIdea = (fields, successRedirect) => {
  return dispatch => {
    dispatch({
      type: 'CREATE_IDEA_ATTEMPT',
    });

    return api.createIdea(fields).then(({ data }) => {
      dispatch({
        type: 'CREATE_IDEA_SUCCESS',
        content: fields,
      });
      return successRedirect(data.id);
    });
  };
};

export default {
  addLikeToIdea,
  addDislikeToIdea,
  createIdea,
  getIdeas,
  getIdea,
};
