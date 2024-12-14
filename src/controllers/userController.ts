import { User } from '../models/directory';
import { Request, Response } from 'express';

//All users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

//Single user
export const getSingleUser = async (req: Request, res: Response) => {
  try {
    console.log('Fetching user with ID:', req.params.userId);
    //Find user by id
    const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
    if (!user) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.json(user);
    } catch (err) {
        if (err instanceof Error) {
            console.error("Error: ", err.message);
            res.status(500).json({error: "Server error", details: err.message});
        } else {
            res.status(500).json({error: "Unknown server error"});
        }
    }

    //Create new user
    export const createUser = async (req: Request, res: Response) => {
        try {
            const User = await User.create(req.body);
            res.status(201).json(User);
        } catch (err) {
            res.status(500).json(err);
        }
    };

    //Delete user
    export const deleteUser = async (req: Request, res: Response) => {
        try {
            const User = await User.findByIdAndDelete(req.params.userId);

            if (!User) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.status({ message: 'User deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    };

    export const updateSingleUser = async (req: Request, res: Response) => {
        try {
            const user = await User.findOneAndUpdate(
                { name: req.params.name },
                req.body,
                { new: true, runValidators: true }
        };

        res.status(200).json(user);
        console.log('User updated!');
    } catch (err) {
        console.log('Something went wrong!');
        res.status(500).json({messae: 'Server error', details: err.message});
    }
}

export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, {
            $addToSet: { friends: req.params.friendId }
        },
        { new: true });
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, {
            $pull: { friends: req.params.friendId }
        },
        { new: true });
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
