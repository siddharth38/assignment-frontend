import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const role = localStorage.getItem('role');

    return role ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
