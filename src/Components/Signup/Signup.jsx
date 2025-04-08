import React, { useContext, useState } from 'react';

import Logo from '../../assets/olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Loader from '../../loader/loader';

export default function Signup() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [password, setPassword] = useState('');
  const [load, setLoad] = useState(false);
  const [err, setError] = useState('');
  const { auth, db } = useContext(FirebaseContext);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(userCredential.user, { displayName: userName });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        userName,
        email,
        password,
        phone: phoneNum,
        createdAt: new Date(),
      });

      Navigate('/login');
    } catch (err) {
      setError(err.code.split('/')[1]);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="signup-container">
      {load && <Loader />}
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            name="name"
            defaultValue="John"
            required
            placeholder="Full name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
            required
            placeholder="Email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phoneNum}
            onChange={(e) =>
              e.target.value.length <= 10 ? setPhoneNum(e.target.value) : ''
            }
            id="lname"
            name="phone"
            maxLength="10"
            defaultValue="Doe"
            placeholder="10-digit phone number"
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
            placeholder="Password must be 8-digit long"
            defaultValue="Doe"
            required
          />
          <br />
          <p>{err ? err : ''}</p>
          <br />
          <button>Signup</button>
        </form>
        <a onClick={() => Navigate('/login')}>Login</a>
      </div>
    </div>
  );
}
