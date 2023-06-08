import React from "react";
import Modal from "@mui/material/Modal";

import { ConnectedProfileCard } from "./ProfileCard";
import { Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 270,
  bgcolor: "#f7f6f4",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

const ProfileCardModal = ({ open, handleClose, username }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <ConnectedProfileCard username={username} />
      </Box>
    </Modal>
  );
};

export default ProfileCardModal;
