import express, { Router, Request, Response, NextFunction } from 'express';
import merchantModule from './module/merchant';
const router: Router = express.Router();

merchantModule(router);

export default router