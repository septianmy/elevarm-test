import express, { Router, Request, Response, NextFunction } from 'express';
import merchantModule from './module/merchant';
import foodMerchantModule from './module/foodMerchant';
const router: Router = express.Router();

merchantModule(router);
foodMerchantModule(router)

export default router