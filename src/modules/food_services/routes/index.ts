import express, { Router, Request, Response, NextFunction } from 'express';
import foodModule from './module/food';
import foodOrderModule from './module/order'
import foodMerchantModule from './module/merchant';

const router: Router = express.Router();

foodModule(router)
foodOrderModule(router)
foodMerchantModule(router)

export default router