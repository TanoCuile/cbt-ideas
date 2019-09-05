import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Banner from '../components/Banner';
import ShareIdeaForm from '../components/ShareIdeaForm';


const ShareIdeaPage = () => {
  return (
    <>
      {/* <Banner /> */}
      <ShareIdeaWrapper>
        <ShareIdeaInner>
          <h1>Post new Idea</h1>
          <Alert variant="warning">
            Please, make sure you are not duplicating someone else idea!
            <br />
            Read existing <Link to="/">Ideas</Link> first!
          </Alert>
          <ShareIdeaForm/>
        </ShareIdeaInner>
      </ShareIdeaWrapper>
    </>
  );
};

const ShareIdeaWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1rem;
`;

const ShareIdeaInner = styled.div`
  width: ${({ theme }) => theme.maxWidth};
`;

export default ShareIdeaPage;
