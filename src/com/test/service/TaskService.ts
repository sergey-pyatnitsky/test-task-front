import axios from "axios";

class TaskService {
  async saveData(name:string, description:string, username:string) {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
    return await axios.post(`http://localhost:8080/task/add/${username}`, 
    {
      name: name,
      description: description,
    })
  }
}

export default new TaskService();