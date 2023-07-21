import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom/dist';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Main from '../pages/Main';
import Details from '../pages/Details';
import Layout from './Layout';
import { auth } from '../firebase';
import GlobalStyle from '../style/GlobalStyle';

export const logInUser = auth;

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      // 임시로 true값으로 설정.
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/:id" element={<Details />} />
            <Route path="/detail" element={<Details />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Layout>
    </BrowserRouter>
  );
};

export default Router;
