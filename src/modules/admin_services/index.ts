import { Router } from 'express';
import adminRoutes from './routes';

const adminModule = Router();
adminModule.use('/api/admin', adminRoutes);

export default adminModule;