import User from "../models/User.js";
import FriendRequest from "../models/friendRequest.js";

export const getRecommendedUser= async (req,res)=>{
    try{
        const currentUserId=req.user.id;
        const currentUser= req.user

        const recommendedUser=await User.find({
            $and:[
                {_id:{$ne:currentUserId}},
                {_id:{$nin:currentUser.friends}},
                // {isOnboarded:true}
            ]
        })

        return res.status(200).json({success:true,recommendedUser})
    }catch(error){
            console.log('error: '+error)
    }
}

export const getMyFriends= async (req,res)=>{
    try{
        const user=await User.findById(req.user.id).select("friends").populate('friends','fullName profilePic bio');
        res.status(200).json( {friends:user.friends})
    }catch(error){
         console.log('error: '+error)
    }
}

export const sendFriendRequest=async(req,res)=>{
    try{
        const myId=req.user.id;
        const {id: recipientId}=req.params;

        if (myId==recipientId) {
            return res.status(400).json({success:false,message:"You can't send friend request to yourself "})
        }

        const recipient=await User.findById(recipientId);
        if (!recipient) {
            return res.status(400).json({success:false, message:"Recipient not found"})
        }

        if (recipient.friends.includes(myId)) {
            return res.status(400).json({success:false, message:"You are already friends with this user"})
        }

        const existingRequest=await FriendRequest.findOne({
            $or:[
                {sender:myId,recipient:recipientId},
                {sender:recipientId,recipient:myId},
            ]
        })

        if (existingRequest) {
            return  res.status(400).json({success:false, message:"A friend request already exists between you and this user"})
        }

        const friendRequest= await FriendRequest.create({
            sender:myId,
            recipient:recipientId
        })

        return res.status(200).json(friendRequest)
    }catch(error){
        console.log("error: "+error)
        return res.json({message:"Internal Server Error "})
    }
}

export const acceptFriendRequest=async(req,res)=>{
    try{
        const {id: requestId}=req.params;
        const friendRequest=await FriendRequest.findById(requestId);
        if (!friendRequest) {
            return  res.status(404).json({success:false, message:" friends request not found"})
        }

        if (friendRequest.recipient.toString()!==req.user.id) {
            return  res.status(403).json({success:false, message:" You are not authorized to accept this request"})
        }
        friendRequest.status="accepted";
        await friendRequest.save()

        //add each user to the other's friends array
        await User.findByIdAndUpdate(friendRequest.sender,{
            $addToSet:{friends:friendRequest.recipient},
        });

        await User.findByIdAndUpdate(friendRequest.recipient,{
            $addToSet:{friends:friendRequest.sender},
        });

        return res.status(200).json({success:true,message:"Friend request accepted"})

    }catch(error){
        console.log("error: "+error)
        return res.status(500).json({message:"Internal Server Error "})
    }

}

export const getFriendRequest=async(req,res)=>{
    try{
        const incomingRequests=await FriendRequest.find({
            recipient:req.user.id,
            status:"pending",
        }).populate("sender","fullName profilePic");

        const acceptedRequests= await FriendRequest.find({
            sender:req.user.id,
            status:"accepted",
        }).populate("recipient","fullName profilePic");

        return res.status(200).json({incomingRequests,acceptedRequests})
    }catch(error){
        console.log("error: "+error)
        return res.status(500).json({message:"Internal Server Error "})
    }
}


export const getOutgoingFriendRequest=async(req,res)=>{
    try{

        const outgoingRequest=await FriendRequest.find({
            sender:req.user.id,
            status:"pending",

        }).populate("recipient","fullName profilePic");

        return res.status(200).json(outgoingRequest)
    }catch(error){
        console.log("error: "+error)
        return res.status(500).json({message:"Internal Server Error "})
    }
}