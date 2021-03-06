import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';
import Nav from './components/Nav';
import Main from './pages/Main';
import Post from './pages/Post';
import SigninModal from './components/SigninModal';
import RequireModal from './components/RequireModal';
import ConfirmModal from './components/ConfirmModal';
import QuarterModal from './components/QuarterModal';
import Setting from './pages/Setting';
import Write from './pages/Write';
import Chatlist from './pages/Chatlist';
import ChattingPage from './pages/ChattingPage';
import Loading from './components/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const url = new URL(window.location.href);
  const href = url.href;
  const accessToken = href.split('=')[1];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    window.location.href = `${process.env.REACT_APP_DOMAIN}`;
  }

  return (
    <BrowserRouter>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="appContainer">
          <ConfirmModal />
          <QuarterModal />
          <SigninModal />
          <RequireModal />
          <Nav />

          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route exact path="/write">
              <Write />
            </Route>
            <Route exact path="/setting">
              <Setting />
            </Route>
            <Route exact path="/post/:postId">
              <Post />
            </Route>
            <Route exact path="/write/:postId">
              <Write />
            </Route>
            <Route exact path="/chatlist">
              <Chatlist />
            </Route>
            <Route exact path="/chatlist/:id">
              <ChattingPage />
            </Route>
          </Switch>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
