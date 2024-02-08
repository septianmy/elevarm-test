import { NextFunction, Request, Response } from 'express';
import CustomRequest from '../../common/types/CustomRequest';
import * as model from "../models/model"

const getOrderRider = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let rider_id = req.user
        const data = await model.getOrderRequestRider(rider_id)
        if(data.length != 0){
            res.json({
                status: true, 
                message: "Request Ride Found", 
                data: data[0]
            })
        } else {
            res.json({
                status: false, 
                message: "No Request Order"
            })
        }
    } catch (error) {
        res.json({
            status: false, 
            message: "Something Wrong"
        })
    }
}

const confirmOrderRider = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let rider_id = req.user
        let {id} = req.params
        let confirm:any = req.query.confirm
        let message = ""
        const checkOrder = await model.findOrderRideById(id, rider_id)
        if(checkOrder.length != 0){
            await model.begin()
            if(confirm == 1 || confirm == 2 || confirm == 3){
                if(confirm == 3){
                    if(checkOrder[0].status == 2 || checkOrder[0].status == 1){
                        return res.json({
                            status: false, 
                            message: "Can't reject order"
                        })
                    }
                }

                const updateOrder = await model.updateOrderRequestRider(id, rider_id, confirm)
                if(confirm == 2 || confirm == 3){
                    const changeStatusRider = await model.updateRidingStatus(rider_id, false)
                } 
                await model.commit()
                
                switch(confirm) { 
                    case 1: { 
                       message = "Order Accepted Succesfully"
                       break; 
                    } 
                    case 2: { 
                        message = "Order Finished Succesfully"
                       break; 
                    } 
                    case 3: { 
                        message = "Order Rejected Succesfully"
                        break; 
                     } 
                    default: { 
                       message = "Order Accepted Succesfully"
                       break; 
                    } 
                 } 
                res.json({
                    status: true, 
                    message: message
                })
            } else {
                await model.rollback()
                res.json({
                    status: false, 
                    message: "Invalid Parameter"
                })
            }
        } else {
            await model.rollback()
            res.json({
                status: false, 
                message: "Data order not found"
            })
        }
        
    } catch (error) {
        await model.rollback()
        res.json({
            status: false, 
            message: "Something Wrong"
        })
    }
}

export {
    getOrderRider, confirmOrderRider
}