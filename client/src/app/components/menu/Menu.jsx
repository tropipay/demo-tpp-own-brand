import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import MenuPage from "./MenuPage";
import Logo from "../../images/logo192.png";
import './Menu.scss';
import { Typography } from "@mui/material";

export default function Menu() {
  const { t } = useTranslation();
  const history = useNavigate();
  return (
    <Box  id="main-menu" sx={{ display: 'flex' }}>
      <AppBar position="static" >
        <Toolbar className="menu-tool-bar box-align-between">
          <div
            className="box-label-bold menu-btn box box-align-center"
            onClick={() => history("/")}
          >
            <img src={Logo} alt={t("home.name")} />
          </div>

          <MenuPage />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
