import React from "react";
import { Modal, Box } from "@mui/material";

const UploadFileModel = ({
  open,
  setOpen,
  component: Component,
  setRoute,
  assistantId,
  getAllFiles,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 sm:w-[450px] z-[9999991] w-[96%] bg-white dark:bg-slate-900 rounded-md shadow-md hover:shadow-lg p-4 outline-none">
        <Component
          setOpen={setOpen}
          assistantId={assistantId}
          getAllFiles={getAllFiles}
          setRoute={setRoute}
        />
      </Box>
    </Modal>
  );
};

export default UploadFileModel;
