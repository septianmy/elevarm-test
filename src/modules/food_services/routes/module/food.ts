import { Router, Request, Response, NextFunction } from 'express';
import {authClientMiddleware} from '../../../common/middleware/AuthClient';
import CustomRequest from '../../../common/types/CustomRequest';

import { listMerchant, detailMerchant, listFoods, detailFood } from '../../controllers/FoodController';

const foodModule = (router: Router) => {
    router.get('/merchants', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => listMerchant(req, res, next))
    router.get('/merchants/:id', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => detailMerchant (req, res, next))
    router.get('/foods', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => listFoods(req, res, next))
    router.get('/foods/:id', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => detailFood(req, res, next))
}

export default foodModule