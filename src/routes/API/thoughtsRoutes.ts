import { Router } from 'express';
import { createUser, deleteUser, getUsers, getSingleUser, updateSingleUser } from '../../controllers/userController';
import { getAllThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, removeReaction } from '../../controllers/thoughtController';

const router = Router();

//Get all thoughts
router.get('/', getAllThoughts);

//Get single thought
router.get('/:thoughtId', getSingleThought);    

//Post thought
router.post('/', createThought);

//Put thought (update)
router.put('/:thoughtId', updateThought);

//Delete thought
router.delete('/:thoughtId', deleteThought);

//Post reaction
router.post('/:thoughtId/reactions', addReaction);

//Delete reaction
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

export default router;