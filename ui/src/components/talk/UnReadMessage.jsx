import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Talk from "talkjs";
import Badge from "@mui/material/Badge";
import TelegramIcon from "@mui/icons-material/Telegram";

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
    <Badge
      badgeContent={unreadCount}
      color="primary"
      style={{ marginRight: "10px", cursor: "pointer" }}
    >
      <TelegramIcon />
    </Badge>
  );
};

function mapStateToProps(state) {
  return {
    loggedUser: state.loggedUser,
  };
}

export default connect(mapStateToProps)(UnreadMessage);
