import { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from './com/test/router/AppRouter';
import { AuthContext } from './com/test/context/AuthContext';
import { LOGGED_USER_ROLE_KEY, TOKEN_KEY } from './com/test/service/CommonService';

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [role, setRole] = useState(sessionStorage.getItem(LOGGED_USER_ROLE_KEY) ?
    sessionStorage.getItem(LOGGED_USER_ROLE_KEY) : '')

  useEffect(() => {
    if (sessionStorage.getItem(TOKEN_KEY)) {
      setIsAuth(true)
    }
  }, [])

  return (
    <AuthContext.Provider value={
      {
        auth: {
          isAuth: isAuth,
          userId: 0
        },
        setIsAuth
      }}>
      <BrowserRouter>
        <AppRouter setRole={setRole} role={role} />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
