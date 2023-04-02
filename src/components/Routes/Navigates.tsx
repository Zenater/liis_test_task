import React from 'react';
import { PageNotFound } from '../../pages/Page404/PageNotFound';
import { Login } from '../../pages/Login/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainPage } from '../../pages/MainPage/MainPage';

export const PATH = {
  LOGIN: '/login',
  ERROR_PAGE: '/404',
  MAIN_PAGE: '/',
};

export const Navigates = () => {
  return (
    <Routes>
      <Route path={PATH.MAIN_PAGE} element={<MainPage />} />
      <Route path={PATH.ERROR_PAGE} element={<PageNotFound />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path='*' element={<Navigate to={PATH.ERROR_PAGE} />} />
    </Routes>
  );
};
