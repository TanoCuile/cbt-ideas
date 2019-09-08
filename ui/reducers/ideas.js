import ideasData from '../mocks/ideasData.json';

const initialState = {
  loading: false,
  list: []
};

const ideasReducer = (state = initialState, action) => {
  const content = action.content;
  let index = 0;
  const { list } = state;

  switch (action.type) {
    case 'GET_ALL_IDEAS_ATTEMPT':
      return {...state, loading: true};

    case 'GET_ALL_IDEAS_SUCCESS':
      return {
        ...state,
        loading: false,
        list: content.map(idea => ({
          id: idea.id,
          title: idea.title,
          description: idea.description,
          userName: idea.userName,
          commentsCount: idea.commentsCount,
          reactions: {
            likes: idea.likes || 0,
            dislikes: idea.dislikes || 0,
            loading: false,
          },
        })),
      };
    case 'ADD_LIKE_TO_IDEA_ATTEMPT':
      index = list.findIndex(item => item.id === content.id);
      return {
        ...state,
        list: [
          ...list.slice(0, index),
          {
            ...list[index],
            reactions: { ...list[index].reactions, loading: true },
          },
          ...list.slice(index + 1),
        ],
      };

    case 'ADD_LIKE_TO_IDEA_SUCCESS':
      index = list.findIndex(item => item.id === content.id);
      return {
        ...state,
        list: [
          ...list.slice(0, index),
          {
            ...list[index],
            reactions: { dislikes: content.dislikes, likes: content.likes, loading: false },
          },
          ...list.slice(index + 1),
        ],
      };

    case 'ADD_DISLIKE_TO_IDEA_ATTEMPT':
      index = list.findIndex(item => item.id === content.id);
      return {
        ...state,
        list: [
          ...list.slice(0, index),
          {
            ...list[index],
            reactions: { ...list[index].reactions, loading: true },
          },
          ...list.slice(index + 1),
        ],
      };

    case 'ADD_DISLIKE_TO_IDEA_SUCCESS':
      index = list.findIndex(item => item.id === content.id);
      return {
        ...state,
        list: [
          ...list.slice(0, index),
          {
            ...list[index],
            reactions: {
              likes: content.likes,
              dislikes: content.dislikes,
              loading: false,
            },
          },
          ...list.slice(index + 1),
        ],
      };

    default:
      return state;
  }
};

export default ideasReducer;