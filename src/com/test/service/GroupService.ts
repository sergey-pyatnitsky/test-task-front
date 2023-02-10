import axios from "axios";

class GroupService {
  
  async fetchAllGroups() {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
    return await axios.get(`http://localhost:8080/department/findAll`)
  }

  async fetchAllStaffByGroups(departments_id:number[]) {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
    return await axios.post(`http://localhost:8080/department/findStaffByDepartments`, {departments_id})
  }

}

export default new GroupService();