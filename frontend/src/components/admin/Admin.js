// In your Admin.js or equivalent component file
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'; 
import Navbar from "../admin/subcomponents/Navbar";

const Admin = () => {
  let navigate = useNavigate();

  

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Admin;
