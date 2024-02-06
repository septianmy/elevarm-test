import { Router, Request, Response } from 'express';
import {authAdminMiddleware} from '../../../common/middleware/AuthClient';
import { createRider, deleteRider, detailRider, editRider, getAllRider } from '../../controllers/RiderController'

const riderModule = (router: Router) => {
    router.get('/rider', authAdminMiddleware, getAllRider)
    router.post('/rider', authAdminMiddleware, createRider)
    router.get('/rider/:id', authAdminMiddleware, detailRider)
    router.put('/rider/:id', authAdminMiddleware, editRider)
    router.delete('/rider/:id', authAdminMiddleware, deleteRider)
}

export default riderModule