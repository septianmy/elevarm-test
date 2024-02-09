import { Router, Request, Response, NextFunction } from 'express';
import {authClientMiddleware} from '../../../common/middleware/AuthClient';
import CustomRequest from '../../../common/types/CustomRequest';

import { checkFareFoodOrder, createFoodOrder, detailFoodOrder } from '../../controllers/OrderController';

const foodOrderModule = (router: Router) => {
/**
 * @swagger
 * tags:
 *   - name: Food Services - Customer - Order
 *     description: Operations related to customer in GO-Food Services
 */ 

/**
 * @swagger
 * /api/food/check-fare:
 *   post:
 *     tags: [Food Services - Customer - Order]
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
 *               merchant_id:
 *                 type: string
 *                 example: "e3183106-eaf3-48a4-bde0-996866c2f7b7"
 *                 description: The ID of the merchant.
 *               destination_address:
 *                 type: string
 *                 example: "Grand hotel lembang"
 *                 description: The destination address for the order.
 *               list_order:
 *                 type: array
 *                 items:
 *                     type: object
 *                     properties:
 *                        food_id:
 *                           type: string
 *                           example: "fc20ba7b-4983-4c44-adba-a2f2deb139a4"
 *                           description: The ID of the food item.
 *                        quantity:
 *                           type: integer
 *                           example: 2
 *                           description: The quantity of the food item.
 *     responses:
 *       '200':
 *         description: A successful response
 */
    router.post('/check-fare', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => checkFareFoodOrder(req, res, next))

/**
 * @swagger
 * /api/food/order:
 *   post:
 *     tags: [Food Services - Customer - Order]
 *     summary: Create Order GO-Food Services
 *     description: Create Order GO-Food Services
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
 *               merchant_id:
 *                 type: string
 *                 example: "e3183106-eaf3-48a4-bde0-996866c2f7b7"
 *                 description: The ID of the merchant.
 *               destination_address:
 *                 type: string
 *                 example: "Grand hotel lembang"
 *                 description: The destination address for the order.
 *               list_order:
 *                 type: array
 *                 items:
 *                     type: object
 *                     properties:
 *                        food_id:
 *                           type: string
 *                           example: "fc20ba7b-4983-4c44-adba-a2f2deb139a4"
 *                           description: The ID of the food item.
 *                        quantity:
 *                           type: integer
 *                           example: 2
 *                           description: The quantity of the food item.
 *     responses:
 *       '200':
 *         description: A successful response
 */
    router.post('/order', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => createFoodOrder(req, res, next))

/**
 * @swagger
 * /api/food/order/{id}:
 *   get:
 *     tags: [Food Services - Customer - Order]
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
    router.get('/order/:id', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => detailFoodOrder(req, res, next))
}

export default foodOrderModule