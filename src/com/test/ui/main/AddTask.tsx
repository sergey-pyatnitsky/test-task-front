import { Button } from '@mui/material';
import { useState } from 'react';
import AddTaskModal from './AddTaskModal';

const AddTask = () => {

  //Modal handlers
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>Добавить задачу</Button>
      <AddTaskModal open={open} handleClose={handleClose} />
    </>
  );
}

export default AddTask;