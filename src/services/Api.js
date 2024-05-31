import axios from "axios";

export default () =>{
    return axios.create({
        baseURL:"https://drcbd-backend-zgqu.onrender.com/",
        //http://localhost:8080/
        headers:{
            "Content-Type":"aplication/json",
            authorization:`Bearer ${localStorage.getItem("adminToken")}`,
        }
    })
}