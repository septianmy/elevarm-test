import { Router, Request, Response, NextFunction } from 'express';
import {authClientMiddleware} from '../../../common/middleware/AuthClient';
import CustomRequest from '../../../common/types/CustomRequest';

import { checkFareFoodOrder, createFoodOrder, detailFoodOrder } from '../../controllers/OrderController';

const foodOrderModule = (router: Router) => {
    router.post('/check-fare', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => checkFareFoodOrder(req, res, next))
    router.post('/order', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => createFoodOrder(req, res, next))
    router.get('/order/:id', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => detailFoodOrder(req, res, next))
}

export default foodOrderModule