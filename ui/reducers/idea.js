const initialState = {
  loading: true
}

const ideaReducer = (state = initialState, action) => {
  const { content, type } = action;

  switch (type) {
    case 'GET_IDEA_ATTEMPT':
      return {
        ...state,
        loading: true,
      };

    case 'GET_IDEA_SUCCESS':
      return {
        ...state,
        ...content,
        loading: false,
      };

    case 'ADD_LIKE_TO_IDEA_ATTEMPT':
    case 'ADD_DISLIKE_TO_IDEA_ATTEMPT':
      return {
        ...state,
        loading: true
      }

    case 'ADD_DISLIKE_TO_IDEA_SUCCESS':
    case 'ADD_LIKE_TO_IDEA_SUCCESS':
      return {
        ...state,
        ...content,
        loading: false
      }

    default:
      return state;
  }
}

export default ideaReducer;