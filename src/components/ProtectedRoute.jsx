import React from 'react'
import { useMyContext } from '../store/Context'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

  const { token } = useMyContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children

}

export default ProtectedRoute