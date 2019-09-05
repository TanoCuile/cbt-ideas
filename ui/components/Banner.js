import React from 'react'
import styled from 'styled-components';

const Banner = () => {
  return (
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
  );
}


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

export default Banner
