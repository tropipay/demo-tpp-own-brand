import React, { useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import FrontPage from "./FrontPage.jsx";
import HomePage from "./HomePage.jsx";
import Page from "./Page.jsx";

import ProvideAuth from '../../../security/components/provide.auth';
import MessageApp from "../message/MessageApp.jsx";
import LoginPage from "../../../security/components/login.jsx";

export default function AppRoute() {

  useEffect(() => {
    /*dispatch(srvAuth.action.update());
    dispatch(srvProfile.action.update());*/
  });

  return (
    <ProvideAuth>
      <Routes>
        <Route exact path="/" element={<FrontPage />} />
        <Route exact path="/home" element={<Page><HomePage /></Page>} />
        <Route exact path="/login" element={<LoginPage />} />

        <Route exact path='/' render={() => (<FrontPage />)} />
        <Route path='*' exact={true} render={() => (<Navigate to="/" />)} />
      </Routes>

      <MessageApp />
    </ProvideAuth>
  );
}