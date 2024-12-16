import { Router } from 'express';
const router = Router();

import { createUser, deleteUser, getUsers, getSingleUser, updateSingleUser, addFriend, deleteFriend } from '../../controllers/userController';

//Get all users
router.route('/').get(getUsers);

//Get single user
router.route('/:userId').get(getSingleUser);

//Create user
router.route('/').post(createUser);

//Delete user
router.route('/:userId').delete(deleteUser);

//Update user
router.route('/:userId').put(updateSingleUser);

//Add friend
router.route('/:userId/friends/:friendId').post(addFriend);

//Delete friend
router.route('/:userId/friends/:friendId').delete(deleteFriend);

//Export router
export default router;