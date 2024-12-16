import express from 'express';
import db from './config/connection';
import router from './routes/index';
import e from 'express';

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    });
    

