import { Router, Request, Response } from 'express';
import {authAdminMiddleware} from '../../../common/middleware/AuthClient';
import {index, createMerchant, detailMerchant, editMerchant, deleteMerchant} from '../../controllers/MerchantController';

const merchantModule = (router: Router) => {
    router.get('/merchant', authAdminMiddleware, index)
    router.post('/merchant', authAdminMiddleware, createMerchant)
    router.get('/merchant/:id', authAdminMiddleware, detailMerchant)
    router.put('/merchant/:id', authAdminMiddleware, editMerchant)
    router.delete('/merchant/:id', authAdminMiddleware, deleteMerchant)
};
  
export default merchantModule;