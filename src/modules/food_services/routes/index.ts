import express, { Router, Request, Response, NextFunction } from 'express';
import foodModule from './module/food';
import foodOrderModule from './module/order'

const router: Router = express.Router();

foodModule(router)
foodOrderModule(router)

export default router