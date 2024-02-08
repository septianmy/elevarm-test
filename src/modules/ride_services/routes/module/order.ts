import { Router, Request, Response, NextFunction } from 'express';
import {authClientMiddleware} from '../../../common/middleware/AuthClient';
import CustomRequest from '../../../common/types/CustomRequest';

import {createOrderRiding, detailOrderRiding} from '../../controllers/OrderController';

const rideOrderModule = (router: Router) => {
/**
 * @swagger
 * tags:
 *   - name: Ride Services - Customer
 *     description: Operations related to customer in GO-Ride Services
 */ 

/**
 * @swagger
 * /api/ride/customer/order:
 *   post:
 *     tags: [Ride Services - Customer]
 *     summary: Create order GO-RIDE
 *     description: Create order GO-RIDE
 *     parameters:
 *       - in: header
 *         name: client-token
 *         required: true
 *         schema:
 *           type: string
 *         description: The client token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               origin_address:
 *                 type: string
 *               destination_address:
 *                 type: string
 *               distance:
 *                 type: string
 *               fare:
 *                 type: string
 *             example:
 *               origin_address: "Jl. Antapani Lama No.23, Antapani Kulon, Kec. Antapani, Kota Bandung, Jawa Barat 40291, Indonesia"
 *               destination_address: "Jl. Sharon Boulevard Raya, Cipamokolan, Kec. Rancasari, Kota Bandung, Jawa Barat 40292, Indonesia"
 *               distance: "9.2 km"
 *               fare: 46090
 *     responses:
 *       '200':
 *         description: A successful response
 */
    router.post('/customer/order', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => createOrderRiding (req, res, next))
    
/**
 * @swagger
 * /api/ride/customer/order/{id}:
 *   get:
 *     tags: [Ride Services - Customer]
 *     summary: Get Data Detail Order 
 *     description: Get Data Detail Order
 *     parameters:
 *       - in: header
 *         name: client-token
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
 *     responses:
 *       '200':
 *         description: A successful response
 */
    router.get('/customer/order/:id', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => detailOrderRiding (req, res, next))
}

export default rideOrderModule