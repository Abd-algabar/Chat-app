import axios from "axios";
import { axiosInstance } from "./axios"

export const signup=async (signUpData)=>{
    const response=await axiosInstance.post("/auth/signup",signUpData);
    return response.data;
}

export const login=async (loginData)=>{
    const response=await axiosInstance.post("/auth/login",loginData);
    return response.data;
}

export const logout=async ()=>{
    const response=await axiosInstance.post("/auth/logout");
    return response.data;
}

export const getAuthUser=async () => {
     try{
         const res = await axiosInstance.get("auth/me");
      return res.data;
     }catch(error){
        return null
     }
    }

export const completeOnboarding=async(userData)=>{
    const response=await axiosInstance.post("/auth/onboard",userData);
    return response.data;
}

export const getUserFriends=async ()=>{
    const response=await axiosInstance.get("/user/friends");
    console.log("frindes: "+response.data.friends)
    return response.data.friends;

}

export const getRecommendedUsers=async ()=>{
    const response=await axiosInstance.get("/user");
    return response.data.recommendedUser;
}

export const getOutgoingFriendReqs=async ()=>{
    const response=await axiosInstance.get("/user/outgoing-friend-request/");
    return response.data;
}

export const sendFriendRequest=async (userId)=>{
    const response=await axiosInstance.post(`/user/friend-request/${userId}`);
    console.log(response.data)
    return response.data;

}
export const acceptFriendRequest=async (requestId)=>{
    const response=await axiosInstance.put(`/user/friend-request/${requestId}/accept`);
    
    return response.data.message;

}

export const getFriendRequests=async ()=>{
    const response=await axiosInstance.get(`user/friend-request/`);
    
    return response.data;

}

export const getStreamToken=async ()=>{
    const response=await axiosInstance.get(`/chat/token/`);
    
    return response.data;

}