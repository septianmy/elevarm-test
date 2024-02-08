import { NextFunction, Request, Response } from 'express';
import CustomRequest from '../../common/types/CustomRequest';
import * as model from "../models/OrderModel"
import * as foodModel from "../models/FoodModel"
import * as utils from "../utils/utils"
import * as commonUtils from "../../common/utils/utils"

const checkFareFoodOrder = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const payload = req.body

        await utils.checkPayloadCheckFareFood(payload)
            .then(async () => {
                const checkMerchantId = await foodModel.detailMerchant(payload.merchant_id)
                if(checkMerchantId.length != 0){
                    let origin_address = checkMerchantId[0].address
                    let destination_address = payload.destination_address

                    if (!origin_address || !destination_address) {
                        return res.json({
                            status: false, 
                            message: "Both start and destination addresses are required"
                        })
                    }

                    const distance = await commonUtils.getDistance(origin_address, destination_address)
                    const fare = await commonUtils.getFare(distance.value)
                    const total_order = await utils.getTotalFoodOrder(payload)
                    let total_payment = fare + total_order
                    res.json({
                        status: true, 
                        message: "Data loaded successfully", 
                        data: {
                            distance: distance.text, 
                            fare: fare, 
                            total_order: total_order, 
                            total_payment: total_payment
                        }
                    })
                } else {
                    res.json({
                        status: false, 
                        message: "Invalid Merchant"
                    })
                }
            }).catch((error) => {
                console.log(error) 
                res.json({
                    status: false, 
                    message: "Invalid Payload or Merchant"
                })
            });
    } catch (error) {
        res.json({
            status: false, 
            message: "Something Wrong"
        })
    }
}

const createFoodOrder = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let user_id = req.user
        const payload = req.body
        await utils.checkPayloadCheckFareFood(payload)
            .then(async () => {
                const checkMerchantId = await foodModel.detailMerchant(payload.merchant_id)
                if(checkMerchantId.length != 0){
                    await model.begin()
                    let origin_address = checkMerchantId[0].address
                    let destination_address = payload.destination_address
                    if (!origin_address || !destination_address) {
                        return res.json({
                            status: false, 
                            message: "Both start and destination addresses are required"
                        })
                    }

                    const distance = await commonUtils.getDistance(origin_address, destination_address)
                    const fare = await commonUtils.getFare(distance.value)
                    // const total_order = await utils.getTotalFoodOrder(payload)

                    const createOrder = await model.createFoodOrder({
                        user_id: user_id,
                        merchant_id: payload.merchant_id,
                        distance: distance.text,
                        origin_address: origin_address,
                        destination_address: destination_address,
                        status: 0,
                        fare: fare
                    })

                    const dataToInsert = await model.insertManyFoodOrderDetail(createOrder[0].id,payload.list_order)
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
                        message: "Invalid Merchant"
                    })
                }
            }).catch(async (error) => {
                await model.rollback()
                console.log(error) 
                res.json({
                    status: false, 
                    message: "Invalid Payload or Merchant"
                })
            });
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
        let user_id = req.user
        let {id} = req.params
        const dataOrder = await model.findFoodOrderByIdforUser(id, user_id)
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
    checkFareFoodOrder, createFoodOrder, detailFoodOrder
}