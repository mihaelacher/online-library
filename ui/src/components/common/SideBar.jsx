import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AssistantRoundedIcon from "@mui/icons-material/AssistantRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

import SideBarListItem from "./SideBarListItem";

const SideBar = () => {
  const { isAuthenticated, user } = useAuth0();
  const [state, setState] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  return (
    <>
      <aside className="sidebar" onClick={toggleDrawer(true)}></aside>
      <SwipeableDrawer
        anchor="left"
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{ width: 250, backgroundColor: "#f7f6f4" }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <img
            style={{ marginBottom: "20px" }}
            src="/images/logo_transparent.png"
            alt="logo"
            class="footer-logo"
          />
          <List>
            <SideBarListItem
              key="home"
              text="Начало"
              icon={<HomeRoundedIcon />}
              link="/"
            />
            <SideBarListItem
              key="suggestions"
              text="Предложения"
              icon={<AssistantRoundedIcon />}
              link="/browse"
            />
            <SideBarListItem
              key="search"
              text="Търси"
              icon={<SearchRoundedIcon />}
              link="/books"
            />
            {isAuthenticated && (
              <>
                <Divider />
                <SideBarListItem
                  key="newsfeed"
                  text="Актуално"
                  icon={<NewspaperRoundedIcon />}
                  link="/reels"
                />
                <SideBarListItem
                  key="fav"
                  text="Любими"
                  icon={<FavoriteBorderRoundedIcon />}
                  link="/favorites"
                />
                <SideBarListItem
                  key="chat"
                  text="Съобщения"
                  icon={<SendRoundedIcon />}
                  link="/chatbox"
                />
                <Divider />
                <SideBarListItem
                  key="profile"
                  text="Профил"
                  icon={
                    <Avatar
                      alt="Remy Sharp"
                      src={user.picture}
                      sx={{ width: 24, height: 24 }}
                    />
                  }
                  link="/profile"
                />
              </>
            )}
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default SideBar;
