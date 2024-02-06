import { Router, Request, Response } from 'express';
import { createRider, deleteRider, detailRider, editRider, getAllRider } from '../../controllers/RiderController'

const riderModule = (router: Router) => {
    router.get('/rider', getAllRider)
    router.post('/rider', createRider)
    router.get('/rider/:id', detailRider)
    router.put('/rider/:id', editRider)
    router.delete('/rider/:id', deleteRider)
}

export default riderModule