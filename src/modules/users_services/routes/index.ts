import express, { Router, Request, Response, NextFunction } from 'express';
import {authClientMiddleware, authMerchantMiddleware, authRiderMiddleware} from '../../common/middleware/AuthClient';
import CustomRequest from '../../common/types/CustomRequest';

const router: Router = express.Router();

import {detailUser, registerUser, editUser, deleteUser, login} from '../controllers/UserControllers';
import {detailProfileRider, editProfileRider, loginRider, registerRider} from '../controllers/RiderController'
import { loginMerchant, registerMerchant, detailProfileMerchant, editProfileMerchant } from '../controllers/MerchantController';

router.post('/customer/login', login)
router.post('/customer/register', registerUser)
router.get('/customer/data', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => detailUser(req, res, next))
router.put('/customer/data', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => editUser(req, res, next))
// router.delete('/data/customer/:id', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => deleteUser(req, res, next))

//rider route
router.post('/rider/register', registerRider)
router.post('/rider/login', loginRider)
router.get('/rider/data', authRiderMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => detailProfileRider(req, res, next))
router.put('/rider/data', authRiderMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => editProfileRider(req, res, next))

//merchant route 
router.post('/merchant/login', loginMerchant)
router.post('/merchant/register', registerMerchant)
router.get('/merchant/data', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => detailProfileMerchant(req, res, next))
router.put('/merchant/data', authMerchantMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => editProfileMerchant( req, res, next))
export default router;