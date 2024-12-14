import { Router } from 'express';
const router = Router();
import userRoutes from './API/userRoutes';
import thoughtRoutes from './API/thoughtsRoutes';

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export default router;