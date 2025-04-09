import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { doc, getDoc } from 'firebase/firestore';

function View() {
  const { postDetails } = useContext(PostContext);
  const [userDetails, setUserDetails] = useState();
  const { db } = useContext(FirebaseContext);

  const details = postDetails || JSON.parse(localStorage.getItem('postDetails'));
  
  if (!details) {
    return <p>Loading post...</p>;
  }
  
  useEffect(() => {
    if (!details) return; // ✅ Skip if postDetails not ready

    const getUserById = async () => {
      try {
        const userRef = doc(db, 'users', details.user_id);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserDetails(userSnap.data());
        } else {
          console.log('No such user!');
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getUserById();
  }, [details, db]);



  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={details.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {details.price}</p>
          <span>{details.name}</span>
          <p>{details.category}</p>
          <p>{details.description}</p>
          <span>{details.createAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p style={{fontWeight: 500}}>{userDetails?.userName || 'Loading name...'}</p>
          <p>{`📞 ${userDetails?.phone || 'Loading phone...'}`}</p>
          <p style={{fontWeight: 200}}>{`📧 ${userDetails?.email || 'Loading phone...'}`}</p>
        </div>
      </div>
    </div>
  );
}

export default View;
