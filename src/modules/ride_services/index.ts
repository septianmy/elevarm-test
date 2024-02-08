import { Router } from 'express';
import rideServicesRoute from './routes';

const rideServiceModule = Router();
rideServiceModule.use('/api/ride', rideServicesRoute);

export default rideServiceModule;