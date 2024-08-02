import { styles } from "@/styles/style";
import { Box, Modal } from "@mui/material";
import React from "react";

type Props = {
  active: boolean;
  setActive: (active: boolean) => void;
  handleDeleteUser: any;
};

const DeleteUser: React.FC<Props> = ({
  active,
  setActive,
  handleDeleteUser,
}) => {
  return (
    <Modal
      open={active}
      onClose={() => setActive(!active)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
        <h1 className={`${styles.title}`}>
          Are you sure you want to delete this user?
        </h1>
        <div className="flex w-full items-center justify-between mb-6 mt-4">
          <div
            className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`}
            onClick={() => setActive(!active)}
          >
            Cancel
          </div>
          <div
            className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f]`}
            onClick={handleDeleteUser}
          >
            Delete
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteUser;
