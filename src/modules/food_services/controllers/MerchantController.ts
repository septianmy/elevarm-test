import { NextFunction, Request, Response } from 'express';
import CustomRequest from '../../common/types/CustomRequest';
import * as model from "../models/FoodModel"

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

export {
    listFoodMerchant, createFoodMerchant, editFoodMerchant, detailFoodMerchant, deleteFoodMerchant
}