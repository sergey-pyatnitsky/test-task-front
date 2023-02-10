import { useContext } from 'react';
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AuthPage from '../page/AuthPage';
import MainPage from '../page/MainPage';

interface IProps {
  setRole: React.Dispatch<React.SetStateAction<string | null>>
  role: string | null
}

const AppRouter = ({ setRole, role }: IProps) => {
  const { auth } = useContext(AuthContext)

  return (
    auth.isAuth ?
      <Routes>
        <Route
          element={<MainPage role={role} />}
          path={'/main'}
          key={'/main'}>
        </Route>
      </Routes>
      :
      <Routes>
        <Route
          element={<AuthPage setRole={setRole} />}
          path={'/login'}
          key={'/login'}>
        </Route>
      </Routes>

  );
};

export default AppRouter;