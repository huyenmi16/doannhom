import axios from "axios"

export const register  = (user) =>{
    return axios.post("http://127.0.0.1:4000/api/register/", user).then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return {
            message:{
                msgBody:"Tao tai khoan thanh cong",
                msgError:true,
            },
            err,
        }
    });
};