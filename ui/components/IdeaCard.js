import React, { Component } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import IdeaReactions from '../components/IdeaReactions';

class IdeaCard extends Component {

  render() {
    const {
      id,
      title,
      userName,
      commentsCount,
      likes,
      dislikes,
      reactionsLoading
    } = this.props;

    return (
      <IdeaCardWrapper>
        <IdeaCardTitle>
          <Link to={`/idea/${id}`}>{title}</Link>
          <IdeaCardInfo>
            <p className="posted-by">Posted by {userName}</p>
            <p className="comments">Comments: {commentsCount}</p>
          </IdeaCardInfo>
        </IdeaCardTitle>
        <IdeaCardReactions>
          <IdeaReactions
            ideaId={id}
            likes={likes}
            dislikes={dislikes}
            loading={reactionsLoading}
            {...this.props}
            ideaId={id}
          />
        </IdeaCardReactions>
      </IdeaCardWrapper>
    );
  }
}

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
  display:flex;
  flex-direction: column;
`;

export default IdeaCard;
