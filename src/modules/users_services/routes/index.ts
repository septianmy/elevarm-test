import express, { Router, Request, Response, NextFunction } from 'express';
import {authClientMiddleware} from '../../common/middleware/AuthClient';
import CustomRequest from '../../common/types/CustomRequest';

const router: Router = express.Router();

import {detailUser, listUser, registerUser, editUser, deleteUser, login} from '../controllers/UserControllers';

router.post('/login', login)
router.get('/data', authClientMiddleware, (req:CustomRequest, res:Response) => listUser(req, res));
router.post('/register', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => registerUser(req, res, next))
router.get('/data/:id', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => detailUser(req, res, next))
router.put('/data/:id', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => editUser(req, res, next))
router.delete('/data/:id', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => deleteUser(req, res, next))

export default router;