import React, { Component } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';

import ideasActions from '../actions/ideas';

import IdeaReactions from '../components/IdeaReactions';

class IdeaDetailsPage extends Component {
  componentDidMount() {
    const {
      match: { params: { id } },
    } = this.props;
    this.props.getIdea(id);
  }

  render() {
    const {
      idea,
      loading,
      match: { params },
    } = this.props;

    if (loading) return <i className="fas fa-spinner fa-pulse" />;

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
      reactionsLoading,
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
              <div className="comments" style={{ margin: '15px' }}>
                <div className="media">
                  <img
                    style={{ width: '64px', height: '64px' }}
                    src="https://res.cloudinary.com/dq7aojv62/image/upload/v1567757889/user_cutuu3.png"
                    alt=""
                    className="mr-3"
                  />
                  <div className="media-body">
                    <h5 className="mt-0">User 1</h5>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Laborum voluptatem similique pariatur sunt, eius
                      asperiores error dolores explicabo consequatur sit dolorem
                      repudiandae in delectus quam cum. Perferendis aspernatur
                      officia veritatis.
                    </p>
                  </div>
                </div>
                <div className="media mt-3">
                  <img
                    style={{ width: '64px', height: '64px' }}
                    src="https://res.cloudinary.com/dq7aojv62/image/upload/v1567757889/user_cutuu3.png"
                    alt=""
                    className="mr-3"
                  />
                  <div className="media-body">
                    <h5 className="mt-0">User 2</h5>
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Quo, ipsam tempore dolore perferendis saepe eaque
                      molestiae corrupti, fugiat laudantium omnis dicta velit
                      quidem? Ipsa quam tenetur at voluptatibus ipsam?
                    </p>
                  </div>
                </div>
              </div>
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
