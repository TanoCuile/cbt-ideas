import React, { Component } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';

import ideasActions from '../actions/ideas';

import IdeaReactions from '../components/IdeaReactions';
import IdeaComments from '../components/IdeaComments';

class IdeaDetailsPage extends Component {
  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.props.getIdea(id);
  }

  render() {
    const {
      idea,
      match: { params },
    } = this.props;

    if (idea.loading) return <i className="fas fa-spinner fa-pulse" />;

    if (!idea) {
      return <h1>Idea With id {params.id} not found!</h1>;
    }

    const {
      id,
      title,
      userName,
      description,
      likes,
      dislikes,
    } = idea;

    return (
      <IdeaDetailsWrapper>
        <IdeaDetailsInner>
          <CustomCard className="card">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Posted by {userName}
              </h6>
              <div className="card-text">
                {description}
                <IdeaDetailsReactions>
                  <IdeaReactions
                    ideaId={id}
                    likes={likes}
                    dislikes={dislikes}
                    loading={false} // disable loading logic on reaction cause we set loading on all page in ideaReducer
                    {...this.props}
                  />
                </IdeaDetailsReactions>
              </div>
              <hr />
              <IdeaComments ideaId={id} />
            </div>
          </CustomCard>
        </IdeaDetailsInner>
      </IdeaDetailsWrapper>
    );
  }
}

const IdeaDetailsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const IdeaDetailsInner = styled.div`
  width: ${({ theme }) => theme.maxWidth};
`;

const CustomCard = styled.div`
  width: 100%;
  margin: 15px;
`;

const IdeaDetailsReactions = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 200px;
`;

export default connect(
  ({ idea }) => ({ idea }),
  ideasActions,
)(IdeaDetailsPage);
