import { NextFunction, Request, Response } from 'express';
import * as model from "../models/FoodModel"

const listMerchant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await model.listMerchant()
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

const detailMerchant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {id} = req.params
        const data = await model.detailMerchant(id)
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
        console.log(error)
        res.json({
            status: false, 
            message: "Something Wrong"
        })
    }
}

const listFoods = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await model.listFoods() 
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

const detailFood = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {id} = req.params
        const data = await model.detailFoods(id)
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
    listMerchant, detailMerchant, listFoods, detailFood
}