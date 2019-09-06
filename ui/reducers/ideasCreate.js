const initialState = {
  title: '',
  description: '',
  loading: false
}

const ideasCreateReducer = (state = initialState, action) => {
  const content = action.content;
  switch (action.type) {
    case 'CREATE_IDEA_ATTEMPT':
      return {
        ...state,
        loading: true
      };

    case 'CREATE_IDEA_SUCCESS':
      return {
        title: "",
        description: "",
        loading: false
      }

    default:
      return state;
  }
}

export default ideasCreateReducer;