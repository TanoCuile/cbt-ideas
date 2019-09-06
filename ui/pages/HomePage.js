import React, {Component} from 'react';
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

const IdeasLoadingSpinner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class HomePage extends Component {

  componentDidMount() {
    this.props.getIdeas();
  }

  render() {
    const { ideasList, loading } = this.props;

    if (loading)
      return (
        <IdeasLoadingSpinner>
          <i className="fas fa-spinner fa-pulse" />
        </IdeasLoadingSpinner>
      );

    if (!ideasList.length) return <h1>There is no ideas for now.</h1>

    return (
      <>
        {/* <Banner/> */}
        <IdeasWrapper>
          <IdeasInner>
            {ideasList.map(idea => (
              <IdeaCard key={idea.id} {...idea} {...this.props} />
            ))}
          </IdeasInner>
        </IdeasWrapper>
      </>
    );
  }
};

export default connect(
  ({ ideas }) => {
    return { ideasList: ideas.list, loading: ideas.loading };
  },
  ideasActions,
)(HomePage);
