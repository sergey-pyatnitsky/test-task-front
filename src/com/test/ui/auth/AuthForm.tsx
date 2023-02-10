import { Button, Grid, TextField } from '@mui/material';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ErrorProps from "../../model/error";
import ResponseProps from "../../model/response";
import getDefaultRoleRoute from '../../router/routes';
import AuthenticationService from '../../service/AuthenticationService';
import CustomAlert from "../alert/CustomAlert";

interface IProps {
  setRole: Dispatch<SetStateAction<string | null>>;
}

const AuthForm = ({ setRole }: IProps) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState({ alertError: false, fields: { login: false, password: false } })
  const [errorMsg, setErrorMsg] = useState("")
  const { setIsAuth } = useContext(AuthContext)
  const route = useNavigate();

  function setDefaultErrorStatus() {
    setError({
      alertError: false,
      fields: {
        login: false,
        password: false
      }
    }
    )
  }

  function login(e: any) {
    e.preventDefault();
    AuthenticationService.tryToLogin(credentials.username, credentials.password)
      .then((resp: ResponseProps) => {
        const role = AuthenticationService.getMainRoleFromDecodedJwtToken(resp.data)
        setDefaultErrorStatus()
        setRole(role)
        setIsAuth(true)
        AuthenticationService.saveRoleLoggedUserToSessionStorage(role)
        AuthenticationService.saveBearerAuthTokenToSessionStorage(resp.data);
        route(getDefaultRoleRoute(role))
      })
      .catch((err: ErrorProps) => {
        if (err.response.status == 404) {
          setErrorMsg("Пользователь не найден")
          setError({ alertError: true, fields: { login: true, password: false } })
        } else if (err.response.status == 403) {
          setErrorMsg("Неверный пароль")
          setError({ alertError: true, fields: { login: false, password: true } })
        } else {
          setErrorMsg("Доступ запрещен")
          setError({ alertError: true, fields: { login: true, password: true } })
        }
      })
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      marginTop="100px"
    >
      <Grid
        item
        justifyContent="center"
        alignItems="center"
        rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} xs={3}>
        <Grid item>
          <h1>Авторизация</h1>
        </Grid>
        <Grid item>
          <TextField
            error={error.fields.login}
            required
            id="username-input"
            label="Username/Email"
            placeholder="admin"
            helperText={error.fields.login ? "Неверный ввод" : null}
            sx={{ width: "300px", marginBottom: 1 }}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
        </Grid>
        <Grid item>
          <TextField
            error={error.fields.password}
            required
            id="password-input"
            label="Пароль"
            placeholder="@Admin123"
            helperText={error.fields.password ? "Неверный ввод" : null}
            sx={{ width: "300px", marginBottom: 1 }}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </Grid>
        <Grid item>
          <Button
            style={{
              width: '300px',
              height: '56px'
            }}
            variant="contained"
            onClick={login}
          >Далее</Button>
        </Grid>
      </Grid>
      {
        error.alertError ?
          <CustomAlert severity={"error"} errorMsg={errorMsg} error={error} setError={setError} /> : null
      }
    </Grid>
  );
}

export default AuthForm;