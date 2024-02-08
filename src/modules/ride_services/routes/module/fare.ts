import { Router, Request, Response, NextFunction } from 'express';
import {authClientMiddleware} from '../../../common/middleware/AuthClient';
import CustomRequest from '../../../common/types/CustomRequest';

import { checkFare} from '../../controllers/FareController';

const rideFareModule = (router: Router) => {
/**
 * @swagger
 * tags:
 *   - name: Ride Services - Customer
 *     description: Operations related to customer in GO-Ride Services
 */   

/**
 * @swagger
 * /api/ride/fare:
 *   post:
 *     tags: [Ride Services - Customer]
 *     summary: Check fare from pick up point to destination point
 *     description: Check fare from pick up point to destination point
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
 *             example:
 *               origin_address: "Antapani No 23, Bandung"
 *               destination_address: "Grand Sharon Bandung"
 *     responses:
 *       '200':
 *         description: A successful response
 */
    router.post('/fare', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => checkFare(req, res, next))
}

export default rideFareModule