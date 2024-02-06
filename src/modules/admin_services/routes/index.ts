import express, { Router, Request, Response, NextFunction } from 'express';
import merchantModule from './module/merchant';
import foodMerchantModule from './module/foodMerchant';
import riderModule from './module/rider';
const router: Router = express.Router();

merchantModule(router);
foodMerchantModule(router)
riderModule(router)

export default router