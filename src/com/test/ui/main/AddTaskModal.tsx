import {Box, TextField} from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import {useState} from 'react';
import ErrorProps from '../../model/error';
import ResponseProps from '../../model/response';
import TaskService from '../../service/TaskService';
import CustomAlert from '../alert/CustomAlert';
import MultiSelect from './MultiSelect';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "40%",
  height: "70%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IAddTaskModalProps {
  open: boolean
  handleClose: () => void
}

const AddTaskModal = (props: IAddTaskModalProps) => {
  const [selectedStaffUsername, setSelectedStaffUsername] = useState('')
  const [data, setData] = useState({name: '', description: '', username: ''})

  const [error, setError] = useState({alertError: false, fields: {name: false, description: false}})
  const [errorMsg, setErrorMsg] = useState("")

  const setDefaultErrorStatus = () => {
    setError({
        alertError: false,
        fields: {
          name: false,
          description: false
        }
      }
    )
  }

  const saveData = async () => {
    TaskService.saveData(data.name, data.description, selectedStaffUsername)
      .then((resp: ResponseProps) => {
        props.handleClose()
        setDefaultErrorStatus()
      })
      .catch((err: ErrorProps) => {
        setErrorMsg("Ошибка добавления")
        setError({alertError: true, fields: {name: true, description: true}})
      });
  }

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2"
                      sx={{display: "flex", justifyContent: "center"}}>
            <Box sx={{fontWeight: 'bold'}}>
              Добавить задачу
            </Box>
          </Typography>
          <TextField
            error={error.fields.name}
            fullWidth
            required
            id="name-input"
            label="Наименование"
            sx={{marginBottom: 2, marginTop: 2}}
            onChange={(e) => setData({...data, name: e.target.value})}
          />
          <TextField
            error={error.fields.description}
            label="Описание"
            multiline
            rows={4}
            fullWidth
            onChange={(e) => setData({...data, description: e.target.value})}
          />
          <MultiSelect open={props.open}
                       selectedStaffUsername={selectedStaffUsername}
                       setSelectedStaffUsername={setSelectedStaffUsername}/>
          <Button variant="contained" sx={{marginTop: 4, marginLeft: "40%"}} onClick={saveData}>Сохранить</Button>
        </Box>
      </Modal>
      {
        error.alertError ?
          <CustomAlert severity={"error"} errorMsg={errorMsg} error={error} setError={setError}/> : null
      }
    </>
  )
}

export default AddTaskModal;