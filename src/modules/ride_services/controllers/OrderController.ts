import { NextFunction, Request, Response } from 'express';
import CustomRequest from '../../common/types/CustomRequest';
import * as model from "../models/model"

const createOrderRiding = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let user_id = req.user
        let {origin_address, destination_address, distance, fare, order_type, food_order_id} = req.body

        await model.begin()
        const rider_id = await model.getRider()
        if(rider_id.length != 0){
            //update status rider 
            const updateRidingStatusRider = await model.updateRidingStatus(rider_id[0].id, true)

            //create rider order
            const createRideOrder = await model.createOrder({
                customer_id: user_id,
                origin_address: origin_address,
                destination_address: destination_address,
                distance: distance,
                fare: fare,
                rider_id: rider_id[0].id,
                order_type: order_type,
                status: 0,
                food_order_id: food_order_id
            })

            await model.commit()

            res.json({
                status: true, 
                message: "Ride order successfully create",
                data: createRideOrder[0].id
            })
        } else {
            await model.rollback()
            res.json({
                status: false, 
                message: "No available rider"
            })
        }
        
    } catch (error) {
        res.json({
            status: false, 
            message: "Something Wrong"
        })
    }
}

const detailOrderRiding = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let {id} = req.params
        let user_id = req.user
        const data = await model.detailOrder(id, user_id)
        if(data.length != 0){
            res.json({
                status: true, 
                message: "Data loaded successfully", 
                data: data[0]
            })
        } else {
            res.json({
                status: false, 
                message: "Data not found"
            })
        }
        
    } catch (error) {
        res.json({
            status: false, 
            message: "Something Wrong"
        })
    }
}

export {
     createOrderRiding, detailOrderRiding
}