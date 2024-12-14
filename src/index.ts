import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/SundaeSocialAPI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error: unknown) => {
        console.log('Error connecting to MongoDB', error);
    });

    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
    });
    mongoose.connection.once('open', () => {
        console.log('MongoDB connection established successfully');
    });
