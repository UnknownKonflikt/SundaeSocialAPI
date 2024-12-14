import mongoose from "mongoose";
import User from '../models/User';
import Thought from '../models/Thought';

const mongoURI = 'mongodb://localhost:27017/sundae_social';

mongoose.connect(mongoURI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

