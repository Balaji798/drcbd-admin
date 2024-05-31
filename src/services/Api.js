import axios from "axios";

export default () =>{
    return axios.create({
        baseURL:"http://localhost:8080/",
        //http://localhost:8080/
        headers:{
            "Content-Type":"aplication/json",
            authorization:`Bearer ${localStorage.getItem("adminToken")}`,
        }
    })
}