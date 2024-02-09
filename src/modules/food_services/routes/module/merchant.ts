import { Router, Request, Response, NextFunction } from 'express';
import {authMerchantMiddleware} from '../../../common/middleware/AuthClient';
import CustomRequest from '../../../common/types/CustomRequest';

import { confirmOrder, createFoodMerchant, deleteFoodMerchant, detailFoodMerchant, detailOrder, editFoodMerchant, listFoodMerchant, listOrder} from '../../controllers/MerchantController';

const foodMerchantModule = (router: Router) => {
/**
 * @swagger
 * tags:
 *   - name: Food Services - Merchant 
 *     description: Operations related to Merchant for maintain data food
 *   - name: Food Services - Merchant - Order
 *     description: Operations related to Merchant for maintain order
 */ 

/**
 * @swagger
 * /api/food/merchant/data:
 *   get:
 *     tags: [Food Services - Merchant]
 *     summary: Get Data List Food  
 *     description: Get Data List Food at the Merchants 
 *     parameters:
 *       - in: header
 *         name: merchant-token
 *         required: true
 *         schema:
 *           type: string
 *         description: The merchant token for authentication
 *     responses:
 *       '200':
 *         description: A successful response
 */
    router.get('/merchant/data', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => listFoodMerchant(req, res, next))

/**
 * @swagger
 * /api/food/merchant/data:
 *   post:
 *     tags: [Food Services - Merchant]
 *     summary: Add Food
 *     description: Add Food for Merchant 
 *     parameters:
 *       - in: header
 *         name: merchant-token
 *         required: true
 *         schema:
 *           type: string
 *         description: The merchant token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               image_url:
 *                 type: string
 *               status:
 *                 type: boolean
 *               food_type:
 *                 type: number 
 *             example:
 *               name: "Martabak Manis"
 *               price: 8000
 *               image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/MartabakManis.JPG/1200px-MartabakManis.JPG"
 *               status: true
 *               food_type: 1
 *     responses:
 *       '200':
 *         description: A successful response
 */
    router.post('/merchant/data', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => createFoodMerchant(req, res, next))
    
/**
 * @swagger
 * /api/food/merchant/data/{id}:
 *   get:
 *     tags: [Food Services - Merchant]
 *     summary: Get Data Detail Food 
 *     description: Get Data Detail Food
 *     parameters:
 *       - in: header
 *         name: merchant-token
 *         required: true
 *         schema:
 *           type: string
 *         description: The client token for authentication
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Food ID of the example resource.
 *     responses:
 *       '200':
 *         description: A successful response
 */
    router.get('/merchant/data/:id', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => detailFoodMerchant(req, res, next))
    
/**
 * @swagger
 * /api/food/merchant/data/{id}:
 *   put:
 *     tags: [Food Services - Merchant]
 *     summary: Edit Data Food 
 *     description: Edit Data Food 
 *     parameters:
 *       - in: header
 *         name: merchant-token
 *         required: true
 *         schema:
 *           type: string
 *         description: The merchant token for authentication
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Food ID of the example resource.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               image_url:
 *                 type: string
 *               status:
 *                 type: boolean
 *               food_type:
 *                 type: number 
 *             example:
 *               name: "Martabak Manis"
 *               price: 8000
 *               image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/MartabakManis.JPG/1200px-MartabakManis.JPG"
 *               status: true
 *               food_type: 1
 *     responses:
 *       '200':
 *         description: A successful response
 */
    router.put('/merchant/data/:id', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => editFoodMerchant(req, res, next))
    
/**
 * @swagger
 * /api/food/merchant/data/{id}:
 *   delete:
 *     tags: [Food Services - Merchant]
 *     summary: Delete Food
 *     description: Delete Food
 *     parameters:
 *       - in: header
 *         name: merchant-token
 *         required: true
 *         schema:
 *           type: string
 *         description: The client token for authentication
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Food ID of the example resource.
 *     responses:
 *       '200':
 *         description: A successful response
 */
    router.delete('/merchant/data/:id', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => deleteFoodMerchant(req, res, next))

/**
 * @swagger
 * /api/food/merchant/order:
 *   get:
 *     tags: [Food Services - Merchant - Order]
 *     summary: Get Data List Order for Merchants 
 *     description: Get Data List Order for Merchants 
 *     parameters:
 *       - in: header
 *         name: merchant-token
 *         required: true
 *         schema:
 *           type: string
 *         description: The merchant token for authentication
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: integer
 *         description: 0 (New Order / Need Confimation Merchant) 1 (Accepted / On Delivery) 2(Finish Order) 3 (Merchant Rejected) 4(Rider Rejected).
 *     responses:
 *       '200':
 *         description: A successful response
 */
    router.get('/merchant/order', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => listOrder(req, res, next))
    
/**
 * @swagger
 * /api/food/merchant/order/{id}:
 *   get:
 *     tags: [Food Services - Merchant - Order]
 *     summary: Get Data Detail Order for Merchants 
 *     description: Get Data Detail Order for Merchants 
 *     parameters:
 *       - in: header
 *         name: merchant-token
 *         required: true
 *         schema:
 *           type: string
 *         description: The merchant token for authentication
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Order ID of the example resource.
 *     responses:
 *       '200':
 *         description: A successful response
 */
    router.get('/merchant/order/:id', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => detailOrder(req, res, next))

/**
 * @swagger
 * /api/food/merchant/order/{id}:
 *   put:
 *     tags: [Food Services - Merchant - Order]
 *     summary: Confirm Order for Merchant 
 *     description: Confirm Order for Merchant
 *     parameters:
 *       - in: header
 *         name: merchant-token
 *         required: true
 *         schema:
 *           type: string
 *         description: The merchant token for authentication
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Order ID of the example resource.
 *       - in: query
 *         name: confirm
 *         required: true
 *         schema:
 *           type: integer
 *         description: Confirm Order 1 (Accept), 3(Reject Order).
 *     responses:
 *       '200':
 *         description: A successful response
 */
    router.put('/merchant/order/:id', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => confirmOrder(req, res, next))
}

export default foodMerchantModule