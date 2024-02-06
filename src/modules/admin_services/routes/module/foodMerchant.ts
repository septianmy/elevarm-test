import { Router, Request, Response } from 'express';
import {authAdminMiddleware} from '../../../common/middleware/AuthClient';
import { create, deleteFoodMerchant, detailFoodMerchant, editFoodMerchant, getAllFoodMerchant } from '../../controllers/FoodMerchantController'

const foodMerchantModule = (router: Router) => {
    router.get('/food', authAdminMiddleware, getAllFoodMerchant)
    router.post('/food', authAdminMiddleware, create)
    router.get('/food/:id', authAdminMiddleware, detailFoodMerchant)
    router.put('/food/:id', authAdminMiddleware, editFoodMerchant)
    router.delete('/food/:id', authAdminMiddleware, deleteFoodMerchant)
}

export default foodMerchantModule