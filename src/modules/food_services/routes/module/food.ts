import { Router, Request, Response } from 'express';
import { listMerchant, detailMerchant, listFoods, detailFood } from '../../controllers/FoodController';

const foodModule = (router: Router) => {
    router.get('/merchants', listMerchant)
    router.get('/merchants/:id', detailMerchant)
    router.get('/foods', listFoods)
    router.get('/foods/:id', detailFood)
}

export default foodModule