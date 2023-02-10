import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import GroupService from '../../service/GroupService';
import ResponseProps from '../../model/response';
import ErrorProps from '../../model/error';
import DepartmentProps from '../../model/department';
import StaffProps from '../../model/staff';

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

interface IMultiSelectProps {
  open: boolean
  selectedStaffUsername: string
  setSelectedStaffUsername: Dispatch<SetStateAction<string>>
}

const MultiSelect = (props: IMultiSelectProps) => {
  const [departments, setDepartments] = useState([]);
  const [staff, setStaff] = useState([]);
  // const [selectedStaffUsername, setSelectedStaffUsername] = useState('');

  useEffect(() => {
    GroupService.fetchAllGroups()
      .then((resp: ResponseProps) => {
        console.log(resp)
        setDepartments(resp.data)
      })
      .catch((err: ErrorProps) => {
        console.log(err)
      });
  }, [props.open]);

  const fetchStaffFromDepartments = async (departments: DepartmentProps[]) => {
    GroupService.fetchAllStaffByGroups(departments.map((department: DepartmentProps) => department.id))
      .then((resp: ResponseProps) => {
        console.log(resp)
        setStaff(resp.data)
      })
      .catch((err: ErrorProps) => {
        console.log(err)
      });
  }

  const handleChange = (event: SelectChangeEvent) => {
    props.setSelectedStaffUsername(event.target.value as string);
  };

  return (
    <>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={departments}
        getOptionLabel={(option: DepartmentProps) => option.id + '-' + option.name}
        onChange={(event, value) => value.length !== 0 ? fetchStaffFromDepartments(value) : null}
        filterSelectedOptions
        sx={{marginTop: 2}}
        renderInput={(params: any) => (
          <TextField
            {...params}
            label="Подразделения"
          />
        )}
      />

      <Box sx={{marginTop: 2}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Сотрудник</InputLabel>
          <Select
            label="Сотрудник"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.selectedStaffUsername}
            onChange={handleChange}
          >
            {
              staff.map((element: StaffProps) => {
                return <MenuItem key={element.user.username} value={element.user.username}>{element.name}</MenuItem>
              })
            }
          </Select>
        </FormControl>
      </Box>
    </>
  )
}

export default MultiSelect;