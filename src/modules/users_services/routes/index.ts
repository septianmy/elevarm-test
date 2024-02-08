import express, { Router, Request, Response, NextFunction } from 'express';
import {authClientMiddleware, authRiderMiddleware} from '../../common/middleware/AuthClient';
import CustomRequest from '../../common/types/CustomRequest';

const router: Router = express.Router();

import {detailUser, registerUser, editUser, deleteUser, login} from '../controllers/UserControllers';
import {detailProfileRider, editProfileRider, loginRider, registerRider} from '../controllers/RiderController'
import { loginMerchant, registerMerchant } from '../controllers/MerchantController';

router.post('/login', login)
router.post('/register', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => registerUser(req, res, next))
router.get('/data/customer/:id', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => detailUser(req, res, next))
router.put('/data/customer/:id', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => editUser(req, res, next))
router.delete('/data/customer/:id', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => deleteUser(req, res, next))

//rider route
router.post('/rider', registerRider)
router.post('/rider/login', loginRider)
router.get('/data/rider', authRiderMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => detailProfileRider(req, res, next))
router.put('/data/rider', authRiderMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => editProfileRider(req, res, next))

//merchant route 
router.post('/merchant/login', loginMerchant)
router.post('/merchant', registerMerchant)

export default router;