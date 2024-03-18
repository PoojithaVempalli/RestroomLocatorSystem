import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import SignIn from './components/Signin/Signin';
import SignUp from './components/Signup/Signup';
import UserDashboard from './components/user/UserDashboard';
import Admin from './components/admin/Admin';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false); // Set loading to false once we get the auth status
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or your custom loading indicator
  }

  return (
    <div className="App">
      <div id="google_translate_element"></div>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={currentUser ? (currentUser.email === 'adminmaps@gmail.com' ? <Navigate to="/admin" /> : <Navigate to="/user" />) : <SignIn />} />
        <Route path="/user" element={currentUser ? <UserDashboard /> : <Navigate to="/" />} />
        <Route path="/admin" element={currentUser && currentUser.email === 'adminmaps@gmail.com' ? <Admin /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
