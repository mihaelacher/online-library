import React from "react";
import ReactModal from "react-modal";

import { ConnectedProfileCard } from "./ProfileCard";

const ProfileCardModal = ({ isOpen, setIsOpen, username }) => {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "fit-content",
      height: "fit-content",
      padding: 0,
      border: 0,
      borderRadius: 0,
      overflow: "auto",
    },
  };
  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="Profile Card Modal"
      onRequestClose={() => setIsOpen(false)}
      ariaHideApp={false}
      style={customStyles}
    >
      <ConnectedProfileCard sizeClass="" username={username} />
    </ReactModal>
  );
};

export default ProfileCardModal;
