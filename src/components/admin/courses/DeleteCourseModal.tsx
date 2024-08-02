import { styles } from '@/styles/style'
import { Box, Modal } from '@mui/material';
import React from 'react'

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    handleDelete: any
}

const DeleteCourseModal:React.FC<Props> = ({open, setOpen, handleDelete}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(!open)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
        <h1 className={`${styles.title}`}>
          Are you sure you want to delete this course?
        </h1>
        <div className="flex w-full items-center justify-between mb-6 mt-4">
          <div
            className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`}
            onClick={() => setOpen(!open)}
          >
            Cancel
          </div>
          <div
            className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f]`}
            onClick={handleDelete}
          >
            Delete
          </div>
        </div>
      </Box>
    </Modal>
  )
}

export default DeleteCourseModal