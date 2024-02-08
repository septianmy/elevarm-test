import { Router, Request, Response, NextFunction } from 'express';
import {authClientMiddleware} from '../../../common/middleware/AuthClient';
import CustomRequest from '../../../common/types/CustomRequest';

import { checkFare} from '../../controllers/FareController';

const rideFareModule = (router: Router) => {
    router.post('/fare', authClientMiddleware, (req:CustomRequest, res:Response, next:NextFunction) => checkFare(req, res, next))
}

export default rideFareModule