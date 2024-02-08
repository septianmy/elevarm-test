import { Router, Request, Response, NextFunction } from 'express';
import {authClientMiddleware} from '../../../common/middleware/AuthClient';
import CustomRequest from '../../../common/types/CustomRequest';

import {createOrderRiding, detailOrderRiding} from '../../controllers/OrderController';

const rideOrderModule = (router: Router) => {
    router.post('/order', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => createOrderRiding (req, res, next))
    router.get('/order/:id', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => detailOrderRiding (req, res, next))
}

export default rideOrderModule