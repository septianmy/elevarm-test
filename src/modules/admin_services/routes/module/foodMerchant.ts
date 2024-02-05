import { Router, Request, Response } from 'express';
import { create, deleteFoodMerchant, detailFoodMerchant, editFoodMerchant, getAllFoodMerchant } from '../../controllers/FoodMerchantController'

const foodMerchantModule = (router: Router) => {
    router.get('/food', getAllFoodMerchant)
    router.post('/food', create)
    router.get('/food/:id', detailFoodMerchant)
    router.put('/food/:id', editFoodMerchant)
    router.delete('/food/:id', deleteFoodMerchant)
}

export default foodMerchantModule