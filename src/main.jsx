import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { FirebaseContext } from './store/Context.jsx';
import { app, auth, db, storage } from './firebase/config.jsx';
import { AuthProvider } from './store/Context.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <FirebaseContext.Provider value={{ auth, db, app, storage }}>

          <App/>

      </FirebaseContext.Provider>
    </AuthProvider>
  </BrowserRouter>
);
