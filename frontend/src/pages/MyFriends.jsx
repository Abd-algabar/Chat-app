
import { useEffect, useState } from "react";
import {
 
  getUserFriends,
  
} from "../lib/api.js";
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";



import FriendCard  from "../components/FriendCard.jsx";
import NoFriendsFound from "../components/NoFriendsFound.jsx";

const MyFriends = () => {

    const [loadingFriends,setLoadingFriends]=useState(true)
    const [friends,setFriends]=useState([])
 
useEffect(() => {
    const fetchFriends = async () => {
        try {
            const a = await getUserFriends() || [];
            console.log(a);
            setFriends(a);
            console.log(friends);
            setLoadingFriends(false);
        } catch (error) {
            console.error("Error fetching friends:", error);
            setLoadingFriends(false);
        }
    };

    fetchFriends();
}, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}


      </div>
    </div>
  );
};

export default MyFriends;