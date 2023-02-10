import { Alert, AlertColor, AlertTitle } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  severity: AlertColor | undefined
  errorMsg: string
  error: {
    alertError: boolean
    [key: string]: any
  }
  setError: Dispatch<SetStateAction<any>>
}

const CustomAlert = (errorProps: IProps) => {

  let alertTitle: string
  if(errorProps.severity === 'error')
    alertTitle = "Ошибка"
  else if(errorProps.severity === 'success')
    alertTitle = "Успешно"
  else alertTitle = "Предупреждение"

  return (
    <Alert
      severity={errorProps.severity}
      sx={{
        position: "absolute",
        right: 20,
        bottom: 20,
        border: 1
      }}
      onClose={() => {
        errorProps.setError({...errorProps.error, alertError: false})
      }}
    >
      <AlertTitle>{alertTitle}</AlertTitle>
      {errorProps.errorMsg}
    </Alert>
  )
}

export default CustomAlert;