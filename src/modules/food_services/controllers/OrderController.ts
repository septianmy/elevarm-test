import { NextFunction, Request, Response } from 'express';
import CustomRequest from '../../common/types/CustomRequest';
import * as model from "../models/OrderModel"

const createFoodOrder = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let user_id = req.user

        let {merchant_id, distance, list_order} = req.body
        const checkMerchant = await model.findMerchantById(merchant_id)

        if(checkMerchant.length != 0){
            await model.begin()

            const createOrder = await model.createFoodOrder({
                user_id: user_id,
                merchant_id: merchant_id,
                distance: distance,
                address: checkMerchant[0].address,
                status: 0,
                fare: 20000
            })

            if(list_order != undefined){
                const dataToInsert = await model.insertManyFoodOrderDetail(createOrder[0].id,list_order)
                await model.commit()
                res.json({
                    status: true,
                    message: "Create Order Succesfully", 
                    data: {
                        order_id: createOrder[0].id
                    }
                })
            } else {
                await model.rollback()
                res.json({
                    status: false, 
                    message: "List order cannot empty"
                })
            }
        } else {
            await model.rollback()
            res.json({
                status: false,
                message: "Invalid Merchant"
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

const detailFoodOrder = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let {id} = req.params
        const dataOrder = await model.findFoodOrderByIdforUser(id)
        if(dataOrder.length != 0){
            res.json({
                status: true, 
                message: "Data loaded successfully",
                data: dataOrder[0]
            })
        } else {
            res.json({
                status: false, 
                message: "Data not found"
            })
        }
        
    } catch (error) {
        console.log(error)
        res.json({
            status: false, 
            message: "Something Wrong"
        })
    }
}

export {
    createFoodOrder, detailFoodOrder
}