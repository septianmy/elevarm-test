import express, { Router, Request, Response, NextFunction } from 'express';
import {authClientMiddleware, authMerchantMiddleware, authRiderMiddleware} from '../../common/middleware/AuthClient';
import CustomRequest from '../../common/types/CustomRequest';

const router: Router = express.Router();

import {detailUser, registerUser, editUser, deleteUser, login} from '../controllers/UserControllers';
import {detailProfileRider, editProfileRider, loginRider, registerRider} from '../controllers/RiderController'
import { loginMerchant, registerMerchant, detailProfileMerchant, editProfileMerchant } from '../controllers/MerchantController';

/**
 * @swagger
 * tags:
 *   - name: User Services - Customer
 *     description: Operations related to users
 *   - name: User Services - Rider
 *     description: Operations related to riders account
 *   - name: User Services - Merchant
 *     description: Operations related to merchant account
 */

/**
 * @swagger
 * /api/user/customer/login:
 *   post:
 *     summary: Login Customer
 *     tags: [User Services - Customer]
 *     description: Authentication for Customer to get client-token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: "septian_my"
 *               password: "1234567"
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.post('/customer/login', login)

/**
 * @swagger
 * /api/user/customer/register:
 *   post:
 *     tags: [User Services - Customer]
 *     summary: Register Customer
 *     description: Register for Customer Account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               birth_date:
 *                 type: string
 *               address:
 *                 type: string
 *               phone_number:
 *                 type: string 
 *             example:
 *               name: "Septian Maulana Yusuf"
 *               username: "septian_my"
 *               password: "1234567"
 *               email: "haiseptian@gmail.com"
 *               birth_date: "1991-09-15"
 *               address: "Bandung, West Java"
 *               phone_number: "081770611151"
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.post('/customer/register', registerUser)

/**
 * @swagger
 * /api/user/customer/data:
 *   get:
 *     tags: [User Services - Customer]
 *     summary: Get Data Profile Customer
 *     description: Get Data Profile Customer
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
router.get('/customer/data', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => detailUser(req, res, next))

/**
 * @swagger
 * /api/user/customer/data:
 *   put:
 *     tags: [User Services - Customer]
 *     summary: Edit Data Profile Customer
 *     description: Edit Data Profile Customer
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
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               birth_date:
 *                 type: string
 *               address:
 *                 type: string
 *               phone_number:
 *                 type: string 
 *             example:
 *               name: "Septian Maulana Yusuf"
 *               username: "septian_my"
 *               email: "haiseptian@gmail.com"
 *               birth_date: "1991-09-15"
 *               address: "Bandung, West Java"
 *               phone_number: "081770611151"
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.put('/customer/data', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => editUser(req, res, next))
// router.delete('/data/customer/:id', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => deleteUser(req, res, next))

//rider route
/**
 * @swagger
 * /api/user/rider/login:
 *   post:
 *     summary: Login Rider
 *     tags: [User Services - Rider]
 *     description: Authentication for Rider to get rider-token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: "septian_my_rider"
 *               password: "1234567"
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.post('/rider/login', loginRider)

/**
 * @swagger
 * /api/user/rider/register:
 *   post:
 *     tags: [User Services - Rider]
 *     summary: Register Rider
 *     description: Register for Rider Account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               birth_date:
 *                 type: string
 *               address:
 *                 type: string
 *               phone_number:
 *                 type: string 
 *               driving_license_number:
 *                 type: string 
 *               plate_number:
 *                 type: string 
 *               vehicle:
 *                 type: string 
 *             example:
 *               name: "Septian Maulana Yusuf"
 *               username: "septian_my"
 *               password: "1234567"
 *               email: "haiseptian@gmail.com"
 *               birth_date: "1991-09-15"
 *               address: "Bandung, West Java"
 *               phone_number: "081770611151"
 *               driving_license_number: "1234567890"
 *               plate_number: "D 1111 JBR"
 *               vehicle: "Honda Vario 150 Hitam"
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.post('/rider/register', registerRider)

/**
 * @swagger
 * /api/user/rider/data:
 *   get:
 *     tags: [User Services - Rider]
 *     summary: Get Data Profile Customer
 *     description: Get Data Profile Customer
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
router.get('/rider/data', authRiderMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => detailProfileRider(req, res, next))

/**
 * @swagger
 * /api/user/rider/data:
 *   put:
 *     tags: [User Services - Rider]
 *     summary: Edit Data Profile Rider
 *     description: Edit Data Profile Rider
 *     parameters:
 *       - in: header
 *         name: rider-token
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
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               birth_date:
 *                 type: string
 *               address:
 *                 type: string
 *               phone_number:
 *                 type: string 
 *               driving_license_number:
 *                 type: string 
 *               plate_number:
 *                 type: string 
 *               vehicle:
 *                 type: string 
 *             example:
 *               name: "Septian Maulana Yusuf"
 *               username: "septian_my"
 *               email: "haiseptian@gmail.com"
 *               birth_date: "1991-09-15"
 *               address: "Bandung, West Java"
 *               phone_number: "081770611151"
 *               driving_license_number: "1234567890"
 *               plate_number: "D 1111 JBR"
 *               vehicle: "Honda Vario 150 Hitam"
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.put('/rider/data', authRiderMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => editProfileRider(req, res, next))

//merchant route
/**
 * @swagger
 * /api/user/merchant/login:
 *   post:
 *     summary: Login Merchant
 *     tags: [User Services - Merchant]
 *     description: Authentication for Merchant to get merchant-token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: "nur_solihah"
 *               password: "1234567"
 *     responses:
 *       '200':
 *         description: A successful response
 */ 
router.post('/merchant/login', loginMerchant)

/**
 * @swagger
 * /api/user/merchant/register:
 *   post:
 *     tags: [User Services - Merchant]
 *     summary: Register Merchant
 *     description: Register for Merchant Account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               birth_date:
 *                 type: string
 *               address:
 *                 type: string
 *               phone_number:
 *                 type: string 
 *               merchant_name:
 *                 type: string 
 *               merchant_address:
 *                 type: string 
 *             example:
 *               name: "Andri Kurniawan"
 *               username: "new_merchant_2024"
 *               password: "1234567"
 *               email: "merchant_bos@gmail.com"
 *               birth_date: "1991-09-15"
 *               address: "Bandung, West Java"
 *               phone_number: "081770611151"
 *               merchant_name: "Kedai Tahu"
 *               merchant_address: "Jl. Dipati Ukur No. 35"
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.post('/merchant/register', registerMerchant)

/**
 * @swagger
 * /api/user/merchant/data:
 *   get:
 *     tags: [User Services - Merchant]
 *     summary: Get Data Profile Merchant
 *     description: Get Data Profile Merchant
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
router.get('/merchant/data', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => detailProfileMerchant(req, res, next))

/**
 * @swagger
 * /api/user/merchant/data:
 *   put:
 *     tags: [User Services - Merchant]
 *     summary: Edit Data Profile Merchant
 *     description: Edit Data Profile Merchant
 *     parameters:
 *       - in: header
 *         name: merchant-token
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
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               birth_date:
 *                 type: string
 *               address:
 *                 type: string
 *               phone_number:
 *                 type: string 
 *               merchant_name:
 *                 type: string 
 *               merchant_address:
 *                 type: string 
 *             example:
 *               name: "Andri Kurniawan"
 *               username: "new_merchant_2024"
 *               email: "merchant_bos@gmail.com"
 *               birth_date: "1991-09-15"
 *               address: "Bandung, West Java"
 *               phone_number: "081770611151"
 *               merchant_name: "Kedai Tahu"
 *               merchant_address: "Jl. Dipati Ukur No. 35"
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.put('/merchant/data', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => editProfileMerchant( req, res, next))
export default router;