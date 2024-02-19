import axios from "axios";

export default () =>{
    return axios.create({
        baseURL:"https://52.77.244.89:8080/",
        //https://drcbd-backend.onrender.com
        headers:{
            "Content-Type":"aplication/json",
            authorization:`Bearer ${localStorage.getItem("token")}`,
        }
    })
}