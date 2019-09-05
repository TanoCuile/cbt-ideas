import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import ideasActions from '../actions/ideas';

import IdeaCard from '../components/IdeaCard';

const BannerWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.darkBlue};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BannerInner = styled.div`
  width: ${({ theme }) => theme.maxWidth};
  color: ${({ theme }) => theme.blue};
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
`;

const BannerHeading = styled.div`
  padding: 5rem 0;

  h1 {
    font-size: 4rem;
    letter-spacing: 3px;
    margin: 0;
    padding: 0;
  }

  .sub-heading {
    font-size: 2rem;
    margin: 0;
    padding: 0;
  }
`;

const BannerImage = styled.div`
  img {
    width: 250px;
    height: 250px;
  }
`;

const IdeasWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const IdeasInner = styled.div`
  width: ${({ theme }) => theme.maxWidth};
`;

const HomePage = props => {
  const { ideasList } = props;
  return (
    <>
      <BannerWrapper>
        <BannerInner>
          <BannerHeading>
            <h1>Ideas Forum</h1>
            <p className="sub-heading">
              Share your ideas about Locomote CBT Functionality!
            </p>
          </BannerHeading>
          <BannerImage>
            <img
              src="https://res.cloudinary.com/dq7aojv62/image/upload/v1567596856/idea-man-removebg-preview_ak6vvn.png"
              alt=""
            />
          </BannerImage>
        </BannerInner>
      </BannerWrapper>
      <IdeasWrapper>
        <IdeasInner>
          {ideasList.map(idea => (
            <IdeaCard
              key={idea.id}
              id={idea.id}
              title={idea.title}
              userName={idea.userName}
              commentsCount={idea.commentsCount}
              likes={idea.likes}
              dislikes={idea.dislikes}
              loading={idea.loading}
              {...props}
            />
          ))}
        </IdeasInner>
      </IdeasWrapper>
    </>
  );
};


export default connect(
  state => {
    return { ideasList: state.ideas };
  },
  ideasActions,
)(HomePage);
