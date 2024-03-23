import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './Testimonal.css';

function Testimonal() {
  const [formDatas, setFormDatas] = useState([]);

  const fetchPost = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'reviews'));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setFormDatas(newData);
    } catch (error) {
      console.error('Error fetching reviews: ', error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

 
}

export default Testimonal;