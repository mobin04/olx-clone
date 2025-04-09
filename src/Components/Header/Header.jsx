import React, { useContext, useEffect, useState } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useNavigate } from 'react-router-dom';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { signOut } from 'firebase/auth';
import { ProductDataContext } from '../../store/AllProductData';
import { PostContext } from '../../store/PostContext';

function Header() {
  const Navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext);
  const { setUser } = useContext(AuthContext);

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { allProduct } = useContext(ProductDataContext);
  const { setPostDetails } = useContext(PostContext);

  const handleSearch = () => {
    const allProducts = [];

    // Loop through all categories
    for (const category in allProduct) {
      const productList = allProduct[category];

      productList.forEach((product) => {
        allProducts.push({
          ...product,
          category, // Add category info to each product
        });
      });
    }

    // filter based on searchText
    const results = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.category.toLowerCase().includes(searchText.toLowerCase())
    );

    setSearchResults(results);
    setShowModal(true);
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div
          className="brandName"
          style={{ cursor: 'pointer' }}
          onClick={() => Navigate('/')}
        >
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
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value)
                searchText.length > 1 ? handleSearch() : ''
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
          </div>
          <div onClick={(e) => handleSearch()} className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => (!user ? Navigate('/login') : '')}
          >
            {user ? `Welcome ${user.displayName.split(' ')[0]}` : 'Login'}
          </span>
          <hr />
        </div>
        {user ? (
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => {
              signOut(auth)
                .then(() => {
                  localStorage.clear();
                  setUser(null);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            Log out
          </span>
        ) : (
          ''
        )}

        <div className="sellMenu" onClick={() => Navigate('/sell')}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="popup-modal">
          <div className="search-title-container">
            <h2>Search Result</h2>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
          {searchResults.length > 0?searchResults.map((product) => {
            return (
              <div className="popup-content" key={product.id}>
                <div className="img-container">
                  <img src={product.url} />
                  <h4 className="product-name">{product.name}</h4>
                  <p className="product-description">{product.description}</p>
                </div>
                <div className="price-container">
                  <p className="product-catogory">
                    <span style={{ fontWeight: 500 }}>Catogory: </span>
                    {product.category}
                  </p>
                  <p className="product-price">
                    <span style={{ fontWeight: 500 }}>Price: </span>
                    {product.price}
                  </p>
                  <div>
                    <button
                      onClick={() => {
                        setPostDetails(product);
                        localStorage.setItem(
                          'postDetails',
                          JSON.stringify(product)
                        );
                        Navigate('/view');
                      }}
                    >
                      More details
                    </button>
                  </div>
                </div>
              </div>
            );
          }): <h3>No Result Found</h3> }
        </div>
      )}
    </div>
  );
}

export default Header;
