import AddTaskBtn from "../ui/main/AddTask";

interface IMainPageProps {
  role: string | null
}

const MainPage = ({role}: IMainPageProps) => {

  return (
    <AddTaskBtn/>
  )
}

export default MainPage;