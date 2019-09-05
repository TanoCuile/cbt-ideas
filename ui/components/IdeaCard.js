import React, { Component } from 'react';
import styled from 'styled-components';

const IdeaCardWrapper = styled.div`
  min-width: 600px;
  border: 1px solid ${({ theme }) => theme.blue};
  border-radius: 0.25rem;
  padding: 10px;
  margin: 10px;

  display: flex;
  justify-content: space-between;
`;

const IdeaCardTitle = styled.div`
  a {
    color: ${({ theme }) => theme.darkBlue};
    font-size: 20px;
    text-decoration: none;

    :hover {
      color: ${({ theme }) => theme.blue};
    }
  }
`;

const IdeaCardInfo = styled.div`
  display: flex;
  font-size: 14px;

  .posted-by {
    color: ${({ theme }) => theme.gray};
  }

  .comments {
    color: ${({ theme }) => theme.gray};
    padding-left: 15px;
  }
`;

const IdeaCardReactions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .loading-spinner {
    font-size: 20px;
    margin: 15px;
  }

  button {
    margin: 5px;
    background: none;
    box-shadow: none;
    border: none;
    cursor: pointer;
    font-size: 12px;
    outline: none;
    display: flex;
    align-items: center;

    i {
      font-size: 20px;
      padding-right: 10px;
    }
  }

  .reaction-like {
    :hover {
      color: ${({ theme }) => theme.green};
    }
  }
  .reaction-dislike {
    :hover {
      color: ${({ theme }) => theme.red};
    }
  }
`;

class IdeaCard extends Component {

  render() {
    const {
      id,
      title,
      userName,
      commentsCount,
      likes,
      dislikes,
      addLikeToIdea,
      addDislikeToIdea,
      loading
    } = this.props;

    return (
      <IdeaCardWrapper>
        <IdeaCardTitle>
          <a href="#">{title}</a>
          <IdeaCardInfo>
            <p className="posted-by">Posted by {userName}</p>
            <p className="comments">Comments: {commentsCount}</p>
          </IdeaCardInfo>
        </IdeaCardTitle>
        <IdeaCardReactions>
          {
            loading
            ? (<i className="fas fa-spinner fa-pulse loading-spinner" />)
            : (
              <>
              <button className="reaction-like" onClick={() => addLikeToIdea(id)}>
                <i className="fas fa-thumbs-up" />
                <p>{likes}</p>
              </button>
              <button
                className="reaction-dislike"
                onClick={() => addDislikeToIdea(id)}
              >
                <i className="fas fa-thumbs-down" />
                <p>{dislikes}</p>
              </button>
              </>
            )
          }

        </IdeaCardReactions>
      </IdeaCardWrapper>
    );
  }
}

export default IdeaCard;
