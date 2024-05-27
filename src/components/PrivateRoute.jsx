import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component }) => {
  const user = localStorage.getItem("adminToken");

  return user ? <Component /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;