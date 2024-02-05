import { Router } from 'express';
import userRoutes from './routes';

const userModule = Router();
userModule.use('/api/user', userRoutes);

export default userModule;