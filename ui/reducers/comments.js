const initialState = {
  loading: false,
  list: [],
  createComment: {
    message: '',
    loading: false
  },
};

const commentsReducer = (state = initialState, action) => {
  const { content, type } = action;

  switch (type) {
    case 'GET_IDEA_COMMENTS_ATTEMPT':
      return {
        ...state,
        loading: true,
      };

    case 'GET_IDEA_COMMENTS_SUCCESS':
      return {
        loading: false,
        list: content,
      };

    case 'CREATE_IDEA_COMMENT_ATTEMPT':
      return {
        ...state,
        createComment:{
          ...state.createComment,
          loading: true
        }
      }

    case 'CREATE_IDEA_COMMENT_SUCCESS':
      const newListState = [...state.list];
      newListState.push({
        ...state.list[0],
        ...content
      });

      return {
        ...state,
        list: newListState,
        createComment: {
          message: '',
          loading: true,
        },
      };

    case 'CREATE_IDEA_COMMENT_SUCCESS':
      return {
        ...state,
        createComment: {
          ...state.createComment,
          ...content.commentData,
          loading: false,
        },
      };

    default:
      return state;
  }
};

export default commentsReducer;
