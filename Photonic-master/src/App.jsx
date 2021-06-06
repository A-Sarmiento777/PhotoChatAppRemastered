import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory}
  from "react-router-dom";
import { withContext, useNamedContext, Style, If, Else }
  from 'react-easier';
import StartPage from './StartPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import mongoosy from 'mongoosy/frontend';
import Camera from './components/Camera';
import UploadPhoto from './components/UploadPhoto';
import ProfilePage from './pages/ProfilePage';
import PhotosPage from './pages/PhotosPage';
import HomePage from './pages/HomePage';
const { Login, Photo } = mongoosy;
import './styleapp/Main.css'
import Header from './components/Header';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';
import Comments from './components/Comment';

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

// This shouldn't be needed but ensures that 
// we do not get any resets of these context vars
let photos = [], messages = [];

export default withContext('global', {
  // GLOBAL CONTEXT
  user: false,
  sseConnecton: false,
  display: null,
  photos,
  messages
}, function App() {

  // LOGIC
  const g = useNamedContext('global');
  const history = useHistory();


  // start an SSE connection or close it if no user
  const startSSE = user => {
   
    if (!user && g.sseConnection) {
      g.sseConnection.close();
      photos = g.photos = [];
      messages = g.messages = [];
      return;
    }
    // we already have a sse connection (and are logged in)
    if (g.sseConnection) { return; }
    // logged in and not sse connection - so create one
    let sse = new EventSource('/api/sse');
    // add photos from sse
    sse.addEventListener('photos',
      e => photos = g.photos = [...photos, ...JSON.parse(e.data)]
    );
    // add messages from sse
    sse.addEventListener('messages',
      e => messages = g.messages = [...messages, ...JSON.parse(e.data)]
    );
    g.sseConnection = sse;
  }

  // check if a user is logged in and who it is
  const loginCheck = async () => {
    let user = await Login.check();
    startSSE(user);
    g.user = user.js.email ? user : false;
    g.display = true;
  }

  // when the App mounts
  useEffect(() => loginCheck(), []);

  // logout
  const logout = async e => {
    e.preventDefault();
    await Login.logout();
    loginCheck();
    history.push('/');
  }

  // TEMPLATE
  const render = () => g.display && <Style css={css()}>
    <Router>

      {/* <nav>
        <Link to="/">Home</Link>
        <If c={g.user}>
          <p>Logged in as {g.user.name} ({g.user.email})</p>
          <p><a href="#" onClick={logout}>Log out</a></p>
          <Else>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </Else>
        </If>
        <hr />
      </nav> */}
    
      <Switch>
        <Route exact path="/">
          <If c={g.user}>
          <LoginPage {...{ loginCheck }} />
            <Else>
              <h1>Welcome</h1>
            </Else>
          </If>
        </Route>
        <Route path="/register">
          <RegisterPage {...{ loginCheck }} />
        </Route>
        <Route path="/login">
          <LoginPage {...{ loginCheck }} />
        </Route>
        <Route path="/upload">
          <UploadPhoto />
        </Route>
        <Route path="/camera">
          <Camera />
        </Route>

        <Route path="/uploads/:id">
        <ProfilePage/>
        </Route>

        <Route path="/photos">
          <PhotosPage />
        
        </Route>
        <Route path="/comments/:id">
          <Comments/>
        </Route>
        <Route path="/homepage">
          <HomePage/>
        </Route>
      </Switch>
      
    </Router>
  </Style>;

  // STYLE
  const css = () => /*css*/`
    input {
      display: block;
      width: 300px;
      margin-bottom: 10px;
      line-height: 140%;
    }

    nav a {
      padding: 20px;  
    }

    nav a:first-child {
      padding-left: 0
    }
  `;

  return render();
});