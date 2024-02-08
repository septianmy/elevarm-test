import { Router, Request, Response, NextFunction } from 'express';
import {authRiderMiddleware} from '../../../common/middleware/AuthClient';
import CustomRequest from '../../../common/types/CustomRequest';

import { confirmOrderRider, getOrderRider } from '../../controllers/RiderController';

/**
 * @swagger
 * tags:
 *   - name: Ride Services - Rider
 *     description: Operations related to rider in GO-RIDE Services
 */ 

const rideRiderModule = (router: Router) => {
/**
 * @swagger
 * /api/ride/rider/order/{id}:
 *   put:
 *     tags: [Ride Services - Rider]
 *     summary: Confirm Order 
 *     description: Confirm Order
 *     parameters:
 *       - in: header
 *         name: rider-token
 *         required: true
 *         schema:
 *           type: string
 *         description: The client token for authentication
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the example resource.
 *       - in: query
 *         name: confirm
 *         required: true
 *         schema:
 *           type: integer
 *         description: Confirm Order 1 (Accept), 2(Finish Order), 3(Reject Order).
 *     responses:
 *       '200':
 *         description: A successful response
 */
    router.get('/rider/order', authRiderMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => getOrderRider(req, res, next))
    
/**
 * @swagger
 * /api/ride/rider/order:
 *   get:
 *     tags: [Ride Services - Rider]
 *     summary: Get Data Request Order 
 *     description: Get Data Request Order
 *     parameters:
 *       - in: header
 *         name: rider-token
 *         required: true
 *         schema:
 *           type: string
 *         description: The client token for authentication
 *     responses:
 *       '200':
 *         description: A successful response
 */
    router.put('/rider/order/:id', authRiderMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => confirmOrderRider(req, res, next))
}

export default rideRiderModule 