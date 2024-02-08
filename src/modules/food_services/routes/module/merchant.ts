import { Router, Request, Response, NextFunction } from 'express';
import {authMerchantMiddleware} from '../../../common/middleware/AuthClient';
import CustomRequest from '../../../common/types/CustomRequest';

import { confirmOrder, createFoodMerchant, deleteFoodMerchant, detailFoodMerchant, detailOrder, editFoodMerchant, listFoodMerchant, listOrder} from '../../controllers/MerchantController';

const foodMerchantModule = (router: Router) => {
    router.get('/merchant/data', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => listFoodMerchant(req, res, next))
    router.post('/merchant/data', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => createFoodMerchant(req, res, next))
    router.get('/merchant/data/:id', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => detailFoodMerchant(req, res, next))
    router.put('/merchant/data/:id', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => editFoodMerchant(req, res, next))
    router.delete('/merchant/data/:id', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => deleteFoodMerchant(req, res, next))

    router.get('/merchant/order', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => listOrder(req, res, next))
    router.get('/merchant/order/:id', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => detailOrder(req, res, next))
    router.put('/merchant/order/:id', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => confirmOrder(req, res, next))
}

export default foodMerchantModule