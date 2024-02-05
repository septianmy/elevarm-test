import { Router, Request, Response } from 'express';
import {index, createMerchant, detailMerchant, editMerchant, deleteMerchant} from '../../controllers/MerchantController';

const merchantModule = (router: Router) => {
    router.get('/merchant', index)
    router.post('/merchant', createMerchant)
    router.get('/merchant/:id', detailMerchant)
    router.put('/merchant/:id', editMerchant)
    router.delete('/merchant/:id', deleteMerchant)
};
  
export default merchantModule;