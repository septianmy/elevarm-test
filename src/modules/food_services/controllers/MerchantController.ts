import { NextFunction, Request, Response } from 'express';
import CustomRequest from '../../common/types/CustomRequest';
import * as model from "../models/FoodModel"
import * as orderModel from "../models/OrderModel"
import * as rideModel from "../../ride_services/models/model"

//CRUD FOOD
const listFoodMerchant = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let merchant_id = req.user
        const data = await model.listFoodMerchant(merchant_id)
        if(data.length != 0){
            res.json({
                status: true, 
                message: "Data loaded successfully", 
                data: data
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

const createFoodMerchant = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let merchant_id = req.user
        let {name, price, image_url, status, food_type} = req.body

        await model.begin()
        const addData = await model.createFoodMerchant({
            merchant_id: merchant_id,
            name: name,
            price: price,
            image_url: image_url,
            status: status,
            food_type: food_type
        })
        await model.commit()

        res.json({
            status: true, 
            message: "Data added successfully"
        })
    } catch (error) {
        await model.rollback()
        res.json({
            status: false, 
            message: "Something Wrong"
        })
    }
}

const detailFoodMerchant = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let {id} = req.params
        let merchant_id = req.user

        const data = await model.findFoodMerchantById(id, merchant_id)
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

const editFoodMerchant = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let {id} = req.params
        let merchant_id = req.user
        let {name, price, image_url, status, food_type} = req.body

        await model.begin()
        const checkData = await model.findFoodMerchantById(id, merchant_id)
        if(checkData.length != 0){
            const updateData = await model.updateFoodMerchantById({
                merchant_id: merchant_id,
                name: name,
                price: price,
                image_url: image_url,
                status: status,
                food_type: food_type
            }, id)
            await model.commit()
            res.json({
                status: true, 
                message: "Data updated successfully"
            })
        } else {
            await model.rollback()
            res.json({
                status: false, 
                message: "Data Food not found"
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

const deleteFoodMerchant = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let {id} = req.params
        let merchant_id = req.user

        const checkData = await model.findFoodMerchantById(id, merchant_id)
        if(checkData.length != 0){
            const deleteData = await model.deleteFoodMerchantById(id, merchant_id)
            res.json({
                status: true, 
                message: "Delete data successfully"
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

//ORDER
const listOrder = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let merchant_id = req.user
        let status = req.query.status
        const data = await orderModel.listOrderMerchant(merchant_id, status)
        if(data.length != 0){
            res.json({
                status: true,
                message: "Data loaded succesfully",
                data: data
            })
        } else {
            res.json({
                status: false, 
                message: "Data not found", 
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

const detailOrder = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let {id} = req.params
        let merchant_id = req.user
        const data = await orderModel.detailOrderMerchant(id, merchant_id)
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

const confirmOrder = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let {id} = req.params
        let {status} = req.query
        let merchant_id = req.user
        const data = await orderModel.detailOrderMerchant(id, merchant_id)
        if(data.length != 0){
            await model.begin()
            if(status == "1"){
                if(data[0].status == 1){
                    await model.rollback()
                    return res.json({
                        status: false, 
                        message: "Can't change status order"
                    })
                } else {
                    // get rider 
                    const getRider = await rideModel.getRider()
                    if(getRider.length != 0){
                         await rideModel.updateRidingStatus(getRider[0].id, true)
                        const createOrderRide = await rideModel.createOrder({
                            customer_id: data[0].user_id,
                            origin_address: data[0].origin_address,
                            destination_address: data[0].destination_address,
                            distance: data[0].distance,
                            fare: data[0].fare,
                            rider_id: getRider[0].id,
                            order_type: 2, //order_type go food
                            status: 0,
                            food_order_id: data[0].id
                        })

                        await orderModel.updateOrderMerchant(status, createOrderRide[0].id, data[0].id, merchant_id) 
                        await model.commit()

                        res.json({
                            status: true, 
                            message: "Order has been accepted"
                        })
                    } else {
                        await model.rollback()
                        res.json({
                            status: false, 
                            message: "No Available Rider"
                        })
                    } 
                }
            } else if(status == '3') {
                //cancel by merchant
                await orderModel.updateOrderMerchant(status, null, data[0].id, merchant_id)
                await model.commit()
                res.json({
                    status: true, 
                    message: "Order has been rejected"
                })
            } else {
                await model.rollback()
                res.json({
                    status: false, 
                    message: "Invalid Params Status"
                })
            }
        } else {
            await model.rollback()
            res.json({
                status: false, 
                message: "Data not found"
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
    listFoodMerchant, createFoodMerchant, editFoodMerchant, detailFoodMerchant, deleteFoodMerchant, 
    listOrder, detailOrder, confirmOrder
}