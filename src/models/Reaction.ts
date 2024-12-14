import { Schema, Document} from 'mongoose';

export interface IReaction extends Document {
  reactionBody: string;
  username: string;
  createdAt: Date;
}

export const reactionSchema = new Schema<IReaction>({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});

export default reactionSchema;

