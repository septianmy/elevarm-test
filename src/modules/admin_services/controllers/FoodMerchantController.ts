import { NextFunction, Request, Response } from 'express';
import * as model from "../models/FoodMerchantModel"
import * as modelMerchant from "../models/MerchantModel"

const getAllFoodMerchant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await model.getFoodMerchantAll()
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

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {merchant_id, name, price, image_url, status, food_type} = req.body

        const checkDataMerchant = await modelMerchant.findMerchantById(merchant_id)
        if(checkDataMerchant.length != 0){
            const addData = await model.createFoodMerchant({
                merchant_id: merchant_id,
                name: name,
                price: price,
                image_url: image_url,
                status: status,
                food_type: food_type
            })
    
            res.json({
                status: true, 
                message: "Data added successfully"
            })
        } else {
            res.json({
                status: false, 
                message: "Data Merchant not found"
            })
        }
        
    } catch (error) {
        res.json({
            status: false, 
            message: "Something Wrong"
        })
    }
}

const detailFoodMerchant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {id} = req.params

        const data = await model.findFoodMerchantById(id)
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

const editFoodMerchant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {id} = req.params
        let {merchant_id, name, price, image_url, status, food_type} = req.body

        const checkData = await model.findFoodMerchantById(id)
        if(checkData.length != 0){
            const checkMerchant = await modelMerchant.findMerchantById(merchant_id)
            if(checkMerchant.length != 0){
                const updateData = await model.updateFoodMerchantById({
                    merchant_id: merchant_id,
                    name: name,
                    price: price,
                    image_url: image_url,
                    status: status,
                    food_type: food_type
                }, id)

                res.json({
                    status: true, 
                    message: "Data updated successfully"
                })
            } else {
                res.json({
                    status: false, 
                    message: "Merchant ID not found"
                })
            }
        } else {
            res.json({
                status: false, 
                message: "Data Food not found"
            })
        }
    } catch (error) {
        res.json({
            status: false, 
            message: "Something Wrong"
        })
    }
}

const deleteFoodMerchant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {id} = req.params

        const checkData = await model.findFoodMerchantById(id)
        if(checkData.length != 0){
            const deleteData = await model.deleteFoodMerchantById(id)
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
    getAllFoodMerchant, 
    create, 
    detailFoodMerchant, 
    editFoodMerchant, 
    deleteFoodMerchant
}
