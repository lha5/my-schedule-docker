import React from 'react';
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  column-gap: 20px;

  .active-menu {
    color: ${props => props.theme.colors.primary};
  }
`;

function NavBar() {
  return (
    <Container>
      <div className="menu schedule">
        <NavLink to="/schedule" activeClassName="active-menu">스케쥴 관리</NavLink>
      </div>
      <div className="menu challenge">
        <NavLink to="/challenge" activeClassName="active-menu">마감 챌린지</NavLink>
      </div>
    </Container>
  );
}

export default NavBar;
