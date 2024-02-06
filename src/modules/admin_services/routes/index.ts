import express, { Router, Request, Response, NextFunction } from 'express';
import merchantModule from './module/merchant';
import foodMerchantModule from './module/foodMerchant';
import riderModule from './module/rider';
import adminAuthModule from './module/adminAuth';
const router: Router = express.Router();

merchantModule(router);
foodMerchantModule(router)
riderModule(router)
adminAuthModule(router)

export default router