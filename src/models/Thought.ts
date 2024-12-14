import { Schema, model, Document } from 'mongoose';
import { IReaction } from './Reaction';
import { reactionSchema } from './Reaction';

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
}

//Schema for Thought model
const thoughtSchema = new Schema<IThought>({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

// virtuals for reaction count, override toJSON to include virtuals
{
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
}

thoughtSchema
.virtual('reactionCount')
.get(function () {
  return this.reactions.length;
});


// Initialize our User model
console.log('Registering Thought model');
const Thought = model<IThought>('Thought', thoughtSchema);
console.log('Thought model registered');
export default Thought;
