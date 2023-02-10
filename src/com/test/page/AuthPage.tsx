import AuthForm from '../ui/auth/AuthForm';

interface IProps {
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthPage = ({ setRole }: IProps) => {
  return (
    <AuthForm setRole={setRole} />
  )
}

export default AuthPage;