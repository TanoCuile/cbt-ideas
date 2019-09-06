import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavWrapper = styled.nav`
  width: 100%;
  background-color: ${({ theme }) => theme.darkBlue};
  min-height: 110px;
  display: flex;
  justify-content: center;
`;

const NavInner = styled.div`
  width: ${({ theme }) => theme.maxWidth};
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavItem = styled.div`
  padding: 0 20px;
  font-size: 22px;
  letter-spacing: 0.3;
  a {
    color: #fff;
  }
  :not(:first-child) {
    border-left: 1px solid #fff;
  }
`;

const Nav = () => {
  return (
    <NavWrapper>
      <NavInner>
        <NavItem>
          <img
            src="https://res.cloudinary.com/dq7aojv62/image/upload/v1567595469/cbtIdeas-logo_bpbwxj.png"
            alt="logo"
          />
        </NavItem>
        <NavItem>
          <Link to="/">Home</Link>
        </NavItem>
        <NavItem>
          <Link to="/ideas/create">Share Ideas</Link>
        </NavItem>
      </NavInner>
    </NavWrapper>
  );
}

export default Nav
