const likeIdea = (id) => {
  if (!id) return null;

  // Insert Update Idea request here

  // I resolve this function just for test
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success!');
    }, 1000);
  })
}

const dislikeIdea = id => {
  if (!id) return null;

  // Insert Update Idea request here

  // I resolve this function just for test
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success!');
    }, 1000);
  });
};

const getIdeas = () => {
}

export default {
  likeIdea,
  dislikeIdea,
};