import { Router, Request, Response, NextFunction } from 'express';
import {authMerchantMiddleware} from '../../../common/middleware/AuthClient';
import CustomRequest from '../../../common/types/CustomRequest';

import { createFoodMerchant, deleteFoodMerchant, detailFoodMerchant, editFoodMerchant, listFoodMerchant } from '../../controllers/MerchantController';

const foodMerchantModule = (router: Router) => {
    router.get('/merchant', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => listFoodMerchant(req, res, next))
    router.post('/merchant', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => createFoodMerchant(req, res, next))
    router.get('/merchant/:id', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => detailFoodMerchant(req, res, next))
    router.put('/merchant/:id', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => editFoodMerchant(req, res, next))
    router.delete('/merchant/:id', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => deleteFoodMerchant(req, res, next))
}

export default foodMerchantModule