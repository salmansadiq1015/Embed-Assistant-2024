import React from "react";
import { Modal, Box } from "@mui/material";
import "./model.css";

const CustomModle = ({ open, setOpen, component: Component, setRoute }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="z-[9999] absolute top-0 left-0 w-full h-full py-4"
    >
      {/* <div className="modal-wrapper"> */}
      <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 sm:w-[450px] w-[96%] bg-white dark:bg-slate-900 rounded-md shadow-md hover:shadow-lg p-2 sm:p-4 outline-none">
        <Component setOpen={setOpen} setRoute={setRoute} />
      </Box>
      {/* </div> */}
    </Modal>
  );
};

export default CustomModle;
