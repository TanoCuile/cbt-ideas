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

<<<<<<< HEAD:src/ui/api/index.js
const getIdeas = () => {
}
=======
const createIdea = fields => {
  if (!fields) return null;

  // Insert Update Idea request here

  // I resolve this function just for test
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success!');
    }, 1000);
  });
};
>>>>>>> f704889a457a499a59f5c9175e1c9c85414f0c5b:ui/api/index.js

export default {
  likeIdea,
  dislikeIdea,
  createIdea,
};