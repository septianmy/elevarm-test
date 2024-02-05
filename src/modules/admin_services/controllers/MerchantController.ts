import { NextFunction, Request, Response } from 'express';
import * as model from "../models/MerchantModel"

const index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await model.getAllMerchant()
        if(data.length != 0){
            res.json({
                status: true, 
                message: "Data loaded successfully",
                data: data
            })
        } else {
            res.json({
                status: false, 
                message: "Data not found",
                data: null
            })
        }
        
    } catch (error) {
        res.json({
            status: false, 
            message: "Something Wrong"
        })
    }
}

const createMerchant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {merchant_name, address, merchant_type, rating} = req.body
        const addData = await model.createMerchant({
            merchant_name: merchant_name,
            address: address,
            rating: rating,
            merchant_type: merchant_type
        })
        res.json({
            status: true, 
            message: "Data added successfully"
        })

    } catch (error) {
        res.json({
            status: false, 
            message: "Something Wrong"
        })
    }
}

const detailMerchant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {id} = req.params
        const data = await model.findMerchantById(id)
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

const editMerchant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {id} = req.params
        let {merchant_name, address, merchant_type, rating} = req.body
        const checkData = await model.findMerchantById(id)
        if(checkData.length != 0){
            const updateData = await model.updateMerchantById({
                merchant_name: merchant_name,
                address: address,
                rating: rating,
                merchant_type: merchant_type
            }, id)

            res.json({
                status: true, 
                message: "Data updated successfully"
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

const deleteMerchant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {id} = req.params
        const checkData = await model.findMerchantById(id)
        if(checkData.length != 0){
            const deleteData = await model.deleteMerchantById(id)
            res.json({
                status: true, 
                message: "Delete Merchant Successfully"
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
    index, createMerchant, detailMerchant, editMerchant, deleteMerchant
}