import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import ideasActions from '../actions/ideas';

import IdeaCard from '../components/IdeaCard';
import Banner from '../components/Banner';

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
      {/* <Banner/> */}
      <IdeasWrapper>
        <IdeasInner>
          {ideasList.map(idea => (
            <IdeaCard
              key={idea.id}
              {...idea}
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
