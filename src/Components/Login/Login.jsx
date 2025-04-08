import React, { useContext, useState } from 'react';
import Logo from '../../assets/olx-logo.png';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../store/Context.jsx';
import Loader from '../../loader/loader';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [load, setLoad] = useState(false);
  const [err, setError] = useState('');
  const { auth, db } = useContext(FirebaseContext);
  const Navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Navigate('/');
    } catch (err) {
      setError(err.code.split('/')[1]);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="login-container">
      {load && <Loader />}
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            placeholder="example@email.com"
            required
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            placeholder="Password"
            required
          />
          <br />
          <p style={{ color: 'red' }}>{err ? err : ''}</p>
          <br />
          <button>Login</button>
        </form>
        <a onClick={() => Navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
