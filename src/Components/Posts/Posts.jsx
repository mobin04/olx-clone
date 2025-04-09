import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { collection, getDocs, getDocsFromServer } from 'firebase/firestore';
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const [products, setProducts] = useState({});
  const { db } = useContext(FirebaseContext);
  const { setPostDetails } = useContext(PostContext);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const allProduct = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const grouped = allProduct.reduce((acc, product) => {
        const category = product.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(product);
        return acc;
      }, {});

      setProducts(grouped);
    };

    fetchData();
  }, [db]);

  return (
    <div className="postParentDiv">
      {Object.keys(products).map((category) => (
        <div className="categorySection" key={category}>
          <div className="heading">
            <span>{category}</span>
          </div>
          <div className="cards">
            {products[category].map((product) => (
              <div
                className="card"
                key={product.id}
                onClick={() => {
                  setPostDetails(product);
                  localStorage.setItem('postDetails', JSON.stringify(product));
                  Navigate('/view');
                }}
              >
                <div className="favorite">
                  <Heart />
                </div>
                <div className="image">
                  <img src={product.url} alt={product.name} />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                  <span>{product.createAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
