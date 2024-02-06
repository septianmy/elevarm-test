import express, { Router, Request, Response, NextFunction } from 'express';
import foodModule from './module/food';
const router: Router = express.Router();

foodModule(router)

export default router