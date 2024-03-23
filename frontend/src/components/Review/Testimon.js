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

 return (
    <div className="testimonial-grid">
      {formDatas.map((formData) => (
        <div key={formData.id} className="section_one">
          <div className="section_one__name">
            <img
              className="image"
              src={formData.profileImage || 'data:image/png;base64,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'}
              alt="profile icon"
            />
            <div className="person">
              <h4>{formData.name}</h4>
              <small>{formData.email}</small>
              <br />
              <h4>Rating {formData.rating} ⭐</h4>
            </div>
          </div>
          <p>“{formData.review}”</p>
        </div>
      ))}
    </div>
  ); 
}

export default Testimonal;