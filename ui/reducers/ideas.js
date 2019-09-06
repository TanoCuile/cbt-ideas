import ideasData from '../mocks/ideasData.json';

const initialState = ideasData.map(idea => ({
  id: idea.id,
  title: idea.title,
  description: idea.description,
  userName: idea.userName,
  commentsCount: idea.commentsCount,
  reactions: {
    likes: idea.likes,
    dislikes: idea.dislikes,
    loading: false
  }
}));

const ideasReducer = (state = initialState, action) => {
  const content = action.content;
  let index = 0;
  switch (action.type) {
    case 'ADD_LIKE_TO_IDEA_ATTEMPT':
      index = state.findIndex(item => item.id === content.id);
      return [
        ...state.slice(0, index),
        { ...state[index], reactions: { loading: true } },
        ...state.slice(index + 1),
      ];

    case 'ADD_LIKE_TO_IDEA_SUCCESS':
      index = state.findIndex(item => item.id === content.id);
      return [
        ...state.slice(0, index),
        { ...state[index], reactions: { likes: state[index].likes + 1, loading: false } },
        ...state.slice(index + 1),
      ];

    case 'ADD_DISLIKE_TO_IDEA_ATTEMPT':
      index = state.findIndex(item => item.id === content.id);
      return [
        ...state.slice(0, index),
        { ...state[index], reactions: { loading: true } },
        ...state.slice(index + 1),
      ];

    case 'ADD_DISLIKE_TO_IDEA_SUCCESS':
      index = state.findIndex(item => item.id === content.id);
      return [
        ...state.slice(0, index),
        { ...state[index], reactions: { dislikes: state[index].dislikes + 1, loading: false } },
        ...state.slice(index + 1),
      ];

    default:
      return state;
  }
};

export default ideasReducer;