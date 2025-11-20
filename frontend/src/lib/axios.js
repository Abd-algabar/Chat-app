import axios from "axios"

const BASE_URL=import.meta.env.BASE_URL
export const axiosInstance=axios.create(
    {
        baseURL:"https://chat-app-ksg1.onrender.com/api",
        withCredentials:true, //send cookies with the request
    }
)
