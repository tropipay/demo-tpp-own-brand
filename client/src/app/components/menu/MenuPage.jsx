import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import srvProfile from "../../../security/services/ProfileSlice";

import { Box, Drawer, List } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuItem from "./MenuItem";

import HelpIcon from '@mui/icons-material/Support';
import LogoutIcon from '@mui/icons-material/Logout';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import useCustomMediaQuery from '../../services/CustomMediaQuery.js';
import MenuHeader from "./MenuHeader";
import links from "../../models/menu.link";
import "./MenuPage.scss";

function MenuPage() {
  const mq = useCustomMediaQuery();
  srvProfile.setDependency(useDispatch, useSelector);
  const profile = srvProfile.selector.data();
  const [openDrawer, setDrawerMenu] = React.useState();
  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerMenu(open);
  };

  const options = [
    {
      label: "menu.comunity",
      to: "https://t.me/joinchat/SeivjhsA4ekFEZc4aNR26Q",
      icon: <SendIcon />
    },
    {
      label: "menu.help",
      className: "",
      to: "https://help.tropipay.com",
      icon: <HelpIcon />
    },
    {
      label: "menu.logout",
      className: "out",
      icon: <LogoutIcon />,
      onClick: () => {
        srvProfile.destroy();
      }
    }
  ];

  useEffect(() => {
    if (!profile) {
      srvProfile.action.load()
    }
  }, [profile]);

  return (
    <Box component="nav" sx={{ display: 'flex' }}>
      <IconButton
        aria-haspopup="true"
        onClick={toggleDrawer(true)}
        color="inherit"
      >
        <AccountCircleIcon className="menu-icon-user"  />
      </IconButton>

      <Drawer anchor="right" open={openDrawer}
        onClose={toggleDrawer(false)}
        className={mq.in('xs', 'sm') ? "menu-page" : ''}>

        <div className="box box-vertical box-align-between menu-page-content">
          <MenuHeader model={profile} onClose={toggleDrawer(false)} />
          <List className="page-padding ">
            {options.length > 1
              ? options.map((item, i) => <MenuItem model={item} key={i} className="box-padding" />)
              : null}
          </List>
        </div>
      </Drawer>
    </Box>
  );
}

export default MenuPage;
