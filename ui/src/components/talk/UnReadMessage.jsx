import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Talk from "talkjs";
import Badge from "@mui/material/Badge";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TelegramIcon from "@mui/icons-material/Telegram";
import Tooltip from "@mui/material/Tooltip";

const theme = createTheme({
  palette: {
    primary: {
      main: "#c5a992",
    },
  },
});

const UnreadMessage = ({ loggedUser }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let session;

    if (loggedUser) {
      Talk.ready
        .then(() => {
          const currentUser = new Talk.User({
            id: loggedUser._id,
            name: loggedUser.username,
            photoUrl: loggedUser.pic,
          });

          session = new Talk.Session({
            appId: "tKSRSJUl",
            me: currentUser,
          });

          // Listen to changes in unread conversations
          session.unreads.onChange((unreadConversations) => {
            const amountOfUnreads = unreadConversations.length;

            // Update the unread count
            setUnreadCount(amountOfUnreads);
          });
        })
        .catch((error) => {
          console.error("Error initializing TalkJS:", error);
        });
    }

    return () => {
      // Clean up TalkJS session
      if (session) {
        session.destroy();
      }
    };
  }, [loggedUser]);

  return (
    <ThemeProvider theme={theme}>
      <Badge
        badgeContent={unreadCount}
        color="primary"
        style={{ marginRight: "10px", cursor: "pointer" }}
        sx={{
          "& .MuiBadge-badge": {
            color: "#fff",
          },
        }}
      >
        <Tooltip title="Съобщения" placement="bottom">
          <TelegramIcon />
        </Tooltip>
      </Badge>
    </ThemeProvider>
  );
};

function mapStateToProps(state) {
  return {
    loggedUser: state.loggedUser,
  };
}

export default connect(mapStateToProps)(UnreadMessage);
