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

const getIdeas = () => {

  return dispatch => {

    dispatch({
      type: 'GET_ALL_IDEAS_ATTEMPT',
    })

    return api.getAllIdeas().then(({ data }) => {
      return dispatch({
        type: 'GET_ALL_IDEAS_SUCCESS',
        content: data
      })
    })
  }

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
      return successRedirect(data._id);
    });
  };
};


export default {
  addLikeToIdea,
  addDislikeToIdea,
  createIdea,
  getIdeas,
};