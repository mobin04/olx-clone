import React, { useContext, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import LoginPage from './Pages/Login';
import { AuthContext } from './store/Context';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseContext } from './store/Context';
import Create from './Pages/Create';
import View from './Pages/ViewPost';
import Post from './store/PostContext';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import { AllProductData } from './store/AllProductData';

function App() {
  const { auth } = useContext(FirebaseContext);
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <div>
      <AllProductData>
        <Post>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sell" element={<Create />} />
            <Route path="/view" element={<View />} />
          </Routes>
        </Post>
      </AllProductData>
    </div>
  );
}

export default App;
