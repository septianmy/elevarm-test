import { Router, Request, Response, NextFunction } from 'express';
import {authClientMiddleware} from '../../../common/middleware/AuthClient';
import CustomRequest from '../../../common/types/CustomRequest';

import { listMerchant, detailMerchant, listFoods, detailFood } from '../../controllers/FoodController';

const foodModule = (router: Router) => {
/**
 * @swagger
 * tags:
 *   - name: Food Services - Customer
 *     description: Operations related to customer in GO-Food Services
 */ 

/**
 * @swagger
 * /api/food/merchants:
 *   get:
 *     tags: [Food Services - Customer]
 *     summary: Get Data List Merchants 
 *     description: Get Data List Merchants 
 *     parameters:
 *       - in: header
 *         name: client-token
 *         required: true
 *         schema:
 *           type: string
 *         description: The client token for authentication
 *     responses:
 *       '200':
 *         description: A successful response
 */
    router.get('/merchants', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => listMerchant(req, res, next))
    
/**
 * @swagger
 * /api/food/merchants/{id}:
 *   get:
 *     tags: [Food Services - Customer]
 *     summary: Get Data Detail Merchants 
 *     description: Get Data Detail Merchants 
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
 *         description: The Merchant ID of the example resource.
 *     responses:
 *       '200':
 *         description: A successful response
 */
    router.get('/merchants/:id', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => detailMerchant (req, res, next))

/**
 * @swagger
 * /api/food/foods:
 *   get:
 *     tags: [Food Services - Customer]
 *     summary: Get Data List Merchants 
 *     description: Get Data List Merchants 
 *     parameters:
 *       - in: header
 *         name: client-token
 *         required: true
 *         schema:
 *           type: string
 *         description: The client token for authentication
 *     responses:
 *       '200':
 *         description: A successful response
 */
    router.get('/foods', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => listFoods(req, res, next))
    
/**
 * @swagger
 * /api/food/foods/{id}:
 *   get:
 *     tags: [Food Services - Customer]
 *     summary: Get Data Detail Food
 *     description: Get Data Detail Food
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
 *         description: The Food ID of the example resource.
 *     responses:
 *       '200':
 *         description: A successful response
 */
    router.get('/foods/:id', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => detailFood(req, res, next))
}

export default foodModule