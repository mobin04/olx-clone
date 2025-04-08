import React, {useContext} from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useNavigate } from 'react-router-dom';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { signOut } from 'firebase/auth';

function Header() {
  const Navigate = useNavigate();
  
    const {user} = useContext(AuthContext);
    const {auth} = useContext(FirebaseContext);
    const {setUser} = useContext(AuthContext);
    
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" style={{cursor: 'pointer'}} onClick={() => Navigate('/')}>
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span style={{cursor:'pointer'}} onClick={() =>  !user ? Navigate('/login'):'' }>{user ? `Welcome ${user.displayName.split(' ')[0]}` : 'Login'}</span>
          <hr />
        </div>
          {user ? <span style={{cursor:'pointer'}} onClick={() => {
            signOut(auth).then(() => {
              localStorage.clear();
              setUser(null);
            }).catch((error) => {
              console.log(error);
            })
          }}>Log out</span> : ''}

        <div className="sellMenu"  onClick={() => Navigate('/sell')}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;