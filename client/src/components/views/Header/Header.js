import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';

import NavBar from './NavBar';
import UserMenuBar from './UserMenuBar';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 7px calc(23%);
  margin: 0 auto;
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};

  div.logo-container {
    display: flex;
    margin-right: 20px;
    white-space: nowrap;
    font-size: 19px;

    a {
      font-weight: 900;
    }
  }

  div.menu-hamburger {
    display: none;
  }

  @media only screen and (max-width: 1400px) {
    padding: 7px calc(20%);
  }

  @media ${props => props.theme.device.labtop} {
    padding: 7px calc(15%);
  }

  @media ${props => props.theme.device.tablet} {
    justify-content: center;
    position: relative;

    div:not(.logo-container, .menu-hamburger) {
      display: none;
    }

    div.menu-hamburger {
      display: flex;
      position: absolute;
      right: calc(10%);
      cursor: pointer;
    }
  }
`;

function Header() {
  return (
    <Container>
      <div className="logo-container">
        <Link to="/">
          Time Attack
        </Link>
      </div>
      <NavBar />
      <UserMenuBar />
      <div className="menu-hamburger">
        <MenuOutlinedIcon />
      </div>
    </Container>
  );
}

export default Header;
