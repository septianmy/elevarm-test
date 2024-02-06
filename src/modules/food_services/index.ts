import { Router } from 'express';
import foodServicesRoute from './routes';

const foodServicesModule = Router();
foodServicesModule.use('/api/food', foodServicesRoute);

export default foodServicesModule;