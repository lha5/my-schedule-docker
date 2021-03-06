import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px calc(25%);
  margin: 0 auto;
  font-size: 13px;
  border-top: 1px solid ${props => props.theme.colors.lightGray};
  color: ${props => props.theme.colors.darkGray};

  @media only screen and (max-width: 1400px) {
    padding: 15px calc(20%);
  }

  @media ${props => props.theme.device.labtop} {
    padding: 15px calc(15%);
  }

  @media ${props => props.theme.device.tablet} {
  }
`;

function Footer() {
  return (
    <Container>
      <div className="copyright">
        LHA presents. © LHA ALL RIGHTS RESERVED SINCE 2021
      </div>
    </Container>
  );
}

export default Footer;
