import express, { Router, Request, Response, NextFunction } from 'express';

import rideOrderModule from './module/order';
import rideFareModule from './module/fare';

const router: Router = express.Router();

rideOrderModule(router)
rideFareModule(router)

export default router