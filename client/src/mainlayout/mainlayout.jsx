import React, { useState } from 'react';
import Navbar from "../components/Navbar.jsx";
import Login from '../components/login.jsx';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Navbar onLoginClick={() => setShow(true)} />

      {/* Show Login modal if true */}
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-700/20 backdrop-blur-none">
          <Login onClose={() => setShow(false)} />
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default MainLayout;
