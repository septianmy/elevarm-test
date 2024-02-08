import { Router, Request, Response, NextFunction } from 'express';
import {authRiderMiddleware} from '../../../common/middleware/AuthClient';
import CustomRequest from '../../../common/types/CustomRequest';

import { confirmOrderRider, getOrderRider } from '../../controllers/RiderController';

const rideRiderModule = (router: Router) => {
    router.get('/rider/order', authRiderMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => getOrderRider(req, res, next))
    router.put('/rider/order/:id', authRiderMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => confirmOrderRider(req, res, next))
}

export default rideRiderModule 