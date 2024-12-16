import { Router } from 'express';
const router = Router();
import index from './API/index';

router.use('/API', index);

router.use((req, res) => {
    res.send('Wrong route!');
});

export default router;