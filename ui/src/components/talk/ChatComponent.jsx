import Talk from "talkjs";
import { connect } from "react-redux";
import { useEffect, useState, useRef } from "react";

const ChatComponent = ({ loggedUser }) => {
  const chatboxEl = useRef();
  const [talkLoaded, markTalkLoaded] = useState(false);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded && loggedUser) {
      const currentUser = new Talk.User({
        id: loggedUser._id,
        name: loggedUser.username,
        photoUrl: loggedUser.pic,
      });

      const session = new Talk.Session({
        appId: "tKSRSJUl",
        me: currentUser,
      });

      const inbox = session.createInbox();
      inbox.mount(chatboxEl.current);

      return () => session.destroy();
    }
  }, [talkLoaded, loggedUser]);

  return <div style={{ height: "600px" }} ref={chatboxEl} />;
};

function mapStateToProps(state) {
  return {
    loggedUser: state.loggedUser,
  };
}

export default connect(mapStateToProps)(ChatComponent);
