import express, { Router, Request, Response, NextFunction } from 'express';

import rideOrderModule from './module/order';
import rideFareModule from './module/fare';
import rideRiderModule from './module/rider';

const router: Router = express.Router();

rideOrderModule(router)
rideFareModule(router)
rideRiderModule(router)

export default router