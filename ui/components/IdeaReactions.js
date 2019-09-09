import React from 'react'
import styled from 'styled-components';

const IdeaReactions = props => {

  const {
    ideaId,
    loading,
    likes,
    dislikes,
    addLikeToIdea,
    addDislikeToIdea
  } = props;

  return (
    <>
      {loading ? (
        <LoadingSpinner className="fas fa-spinner fa-pulse" />
      ) : (
        <>
          <ReactionsButton color="green" onClick={() => addLikeToIdea(ideaId)}>
            <i className="fas fa-thumbs-up" />
            <p>{likes}</p>
          </ReactionsButton>
          <ReactionsButton
            color="red"
            onClick={() => addDislikeToIdea(ideaId)}
          >
            <i className="fas fa-thumbs-down" />
            <p>{dislikes}</p>
          </ReactionsButton>
        </>
      )}
    </>
  );
}

const ReactionsButton = styled.button`
  margin: 5px;
  background: none;
  box-shadow: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  outline: none;
  display: flex;
  align-items: center;

  :focus {
    outline: none;
  }

  :hover {
    color: ${({ theme, color }) => theme[color]};
  }

  i {
    font-size: 20px;
    padding-right: 10px;
  }
`;

const LoadingSpinner = styled.i`
  font-size: 20px;
  margin: 15px;
`;

export default IdeaReactions
