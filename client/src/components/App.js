import React from 'react';
import { Route, Switch } from 'react-router-dom';

import styled from 'styled-components';

import Auth from '../hoc/auth';

import Header from './views/Header/Header';
import SignInPage from './views/SignInPage/SignInPage';
import LandingPage from './views/LandingPage/LandingPage';
import MyPage from './views/MyPage/MyPage';
import SchedulePage from './views/SchedulePage/SchedulePage';
import ChallengePage from './views/ChallengePage/ChallengePage';
import DetailChallenge from './views/ChallengePage/DetailChallenge';
import Footer from './views/Footer/Footer';

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0;
`;

function App() {
  return (
    <Wrapper>
      <Header />
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route path="/signin" component={Auth(SignInPage, false)} />
        <Route exact path="/mypage" component={Auth(MyPage, true)} />
        <Route exact path="/schedule" component={Auth(SchedulePage, true)} />
        <Route exact path="/challenge" component={Auth(ChallengePage, true)} />
        <Route exact path="/challenge/:id" component={Auth(DetailChallenge, true)} />
      </Switch>
      <Footer />
    </Wrapper>
  );
}

export default App;
