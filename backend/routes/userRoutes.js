import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { acceptFriendRequest, getFriendRequest, getMyFriends, getOutgoingFriendRequest, getRecommendedUser, sendFriendRequest } from '../controllers/userController.js';

const router =express.Router();

router.use(protectRoute)

router.get('/',getRecommendedUser)
router.get('/friends',getMyFriends)

router.post('/friend-request/:id',sendFriendRequest)
router.put('/friend-request/:id/accept',acceptFriendRequest);

router.get('/friend-request/',getFriendRequest);
router.get('/outgoing-friend-request/',getOutgoingFriendRequest);

export default router;