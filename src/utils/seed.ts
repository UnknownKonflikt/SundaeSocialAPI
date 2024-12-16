import mongoose from "mongoose";
import User from '../models/User';
import Thought from '../models/Thought';

const mongoURI = 'mongodb://localhost:27017/sundae_social';

mongoose.connect(mongoURI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

async function seedDB() {
   try {
    // Clear the User and Thought collections
       await User.deleteMany({});
       await Thought.deleteMany({});
       console.log('Cleared User and Thought collections');
   
       //Users to add
       const users = await User.create([
        { username: "MarkSmith", email: "mark.smith@example.com" },
        { username: "EmilyJones", email: "emily.jones@example.com" },
        { username: "SarahLee", email: "sarah.lee@example.com" },
        { username: "DavidBrown", email: "david.brown@example.com" },
        { username: "ChrisTaylor", email: "chris.taylor@example.com" },
        { username: "JessicaWhite", email: "jessica.white@example.com" },
        { username: "MichaelGreen", email: "michael.green@example.com" },
        { username: "OliviaMartin", email: "olivia.martin@example.com" }
    ]);
   console.log('Users added');

   const thoughtsData = [
    { thoughtText: "JavaScript is the future!", username: "MarkSmith", reactions: [{ reactionBody: "Couldn't agree more!", username: "EmilyJones" }] },
    { thoughtText: "Node.js makes backend development fun!", username: "EmilyJones", reactions: [{ reactionBody: "Totally, I love it!", username: "MarkSmith" }] },
    { thoughtText: "GraphQL is a game changer!", username: "SarahLee", reactions: [{ reactionBody: "It's a must-learn!", username: "DavidBrown" }] },
    { thoughtText: "Vue.js is underrated!", username: "DavidBrown", reactions: [{ reactionBody: "Agreed, it's awesome!", username: "SarahLee" }] },
    { thoughtText: "React Hooks are a lifesaver!", username: "ChrisTaylor", reactions: [{ reactionBody: "Yes, they're great!", username: "JessicaWhite" }] },
    { thoughtText: "Next.js is the best framework for React!", username: "JessicaWhite", reactions: [{ reactionBody: "I second that!", username: "ChrisTaylor" }] },
    { thoughtText: "Tailwind CSS is a game changer!", username: "MichaelGreen", reactions: [{ reactionBody: "I love how easy it is!", username: "OliviaMartin" }] },
    { thoughtText: "I can't live without VS Code!", username: "OliviaMartin", reactions: [{ reactionBody: "Same here, it's amazing!", username: "MichaelGreen" }] }
];

const thoughts = await Promise.all(thoughtsData.map(async (data) => {
    const newThought = new Thought({
        thoughtText: data.thoughtText,
        username: data.username,
        reactions: data.reactions
    });
    return newThought.save();
}
));

console.log('Thoughts added', thoughts);

//Create friendships randomly
for (let i = 0; i < users.length; i++) {
    const friendIndex = Math.floor(Math.random() * users.length);
    if (users[i].username !== users[friendIndex]._id) {
      await User.findByIdAndUpdate(users[i]._id, { $addToSet: { friends: users[friendIndex]._id } });
      await User.findByIdAndUpdate(users[friendIndex]._id, { $addToSet: { friends: users[i]._id } });
    }
    }

    console.log('Friendships created');

    //Exit the process
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
} catch (err) {
    console.error('Error seeding database', err);
    mongoose.disconnect();
}
}

seedDB();
