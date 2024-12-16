import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';

//All thoughts
export const getAllThoughts = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find().sort({ createdAt: -1 });
    res.json(thoughts);
  } catch (err) {
    res.status(400).json(err);
  }
};

//Single thought
export const getSingleThought = async (req: Request, res: Response): Promise<void> => {
    try {
        //Find thought by id
        const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
        if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
        }
        res.status(200).json(thought);
    } catch (err) {
        if (err instanceof Error) {
            console.error("Error: ", err.message);
            res.status(500).json({error: "Server error", details: err.message});
        } else {
            res.status(500).json({error: "Unknown server error"});
        }
    }
};

//Create thought
export const createThought = async (req: Request, res: Response): Promise<void> => {
    try {
        //Create new thought
        const newThought = await Thought.create(req.body);
        //Find user by id and push thought to user's thoughts array
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: newThought._id } },
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(Thought);
    } catch (err) {
        if (err instanceof Error) {
            console.error("Error: ", err.message);
            res.status(500).json({error: "Server error", details: err.message});
        } else {
            res.status(500).json({error: "Unknown server error"});
        }
    }
};

//Update thought
export const updateThought = async (req: Request, res: Response): Promise<void> => {
    try {
        //Find thought by id and update
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

//Delete thought
export const deleteThought = async (req: Request, res: Response): Promise<void> => {
    try {
        //Find thought by id and delete
        const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json({ message: 'Thought deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }
};

//Add reaction
export const addReaction = async (req: Request, res: Response): Promise<void> => {
    try {
        //Find thought by id and update
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        thought.reactions.push(req.body);   
        await thought.save();
        res.json({ message: 'Reaction added!', thought });
    } catch (err) {
        if (err instanceof Error) {
            console.error("Error: ", err.message);
            res.status(500).json({error: "Server error", details: err.message});
        } else {
            res.status(500).json({error: "Unknown server error"});
        }
    }
};
     //Remove reaction
export const removeReaction = async (req: Request, res: Response): Promise<void> => {
    try {
        //Find thought by id and update
        const { thoughtId, reactionId } = req.params;

        //Find thought by id
        const updatedThought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $pull: { reactions: { reactionId } } },
            { new: true }
        );
        if (!updatedThought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json({ message: 'Reaction removed!', thought: updatedThought });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({error: "Server error", details: err.message});
        } else {
            res.status(500).json({error: "Unknown server error"});
        }
    }
};

//Export thought controller functions
export default { getAllThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, removeReaction };
