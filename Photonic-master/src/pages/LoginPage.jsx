import React from 'react';
import { useHistory } from "react-router-dom";
import { Style, useStates } from 'react-easier';
import mongoosy from 'mongoosy/frontend';
const { Login } = mongoosy;
import Header from '../components/Header'
import {Link} from 'react-router-dom'
import '../styleapp/Main.css'

export default function LoginPage({ loginCheck }) {
  // LOGIC

  const s = useStates({
    email: '',
    password: '',
    error: ''
  });

  const history = useHistory();

  const login = async e => {
    e.preventDefault();
    let { email, password } = s;
    let result = await Login.login({ email, password });
    console.log(result && result.name)
    if (result.js.error) { s.error = 'Login failed'; return; }
    loginCheck();
    history.push(`/homepage/${result && result.name}`);
  };

  // TEMPLATE
  const render = () => <Style css={css()}>
 
   <Header/>
    <form onSubmit={login}>
      <input type="email" placeholder="Email"
        required {...s.bind('email')} />
      <input type="password" placeholder="Password"
        required minLength="6"{...s.bind('password')} />
      {s.error && <p>{s.error}</p>}
      <input id = "login_button" type="submit" value="Login" />
    </form>
    <p>Be a member <Link to="/register" style={{textDecoration:"none"}}><span id="signup">SignUp</span></Link></p>
  </Style>;

  // STYLE
  const css = () => /*css*/`
  `;

  return render();
}