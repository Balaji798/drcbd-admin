import axios from "axios";

export default () =>{
    return axios.create({
        baseURL:"https://drcbd-backend-zgqu.onrender.com/",
        //https://drcbd-backend.onrender.com
        headers:{
            "Content-Type":"aplication/json",
            authorization:`Bearer ${localStorage.getItem("token")}`,
        }
    })
}