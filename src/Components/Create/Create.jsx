import React, { Fragment, useContext, useEffect, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import Loader from '../../loader/loader';

const Create = () => {
  const [name, setName] = useState('');
  const [category, setCatagory] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState(null);
  const { db, storage } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const Navigate = useNavigate();
  const date = new Date();
  const [load, setLoad] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!img) alert('Please select the image!');

    try {
      setLoad(true);
      const storageRef = ref(storage, `/image/${img.name}`);
      await uploadBytes(storageRef, img);

      const imageUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'products'), {
        name,
        category,
        price,
        url: imageUrl,
        user_id: user.uid,
        createAt: date.toDateString(),
      });

      setTimeout(() => {
        setLoad(false);
        Navigate('/');
      }, 1500);
    } catch (error) {
      setLoad(false);
      alert(error.code);
    }
  };

  return (
    <Fragment>
      <Header />
        <div className="centerDiv">
        {load && <Loader />}
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
              name="Name"
              required
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e) => setCatagory(e.target.value)}
              name="category"
              required
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              name="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <br />
            <img
              alt="Posts"
              width="200px"
              height="200px"
              src={img ? URL.createObjectURL(img) : null}
            />
            <br />
            <input
              onChange={(e) => setImg(e.target.files[0])}
              type="file"
              required
            />
            <br />
            <button type="submit" className="uploadBtn">
              Upload and Submit
            </button>
          </form>
        </div>
    </Fragment>
  );
};

export default Create;
