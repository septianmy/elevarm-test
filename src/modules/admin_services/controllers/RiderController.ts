import { NextFunction, Request, Response } from 'express';
import * as model from "../models/RiderModel"

const getAllRider = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await model.getAllRider()
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

const createRider = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {name, plate_number, vehicle} = req.body
        const checkPlateNumber = await model.findRiderByPlateNumber(plate_number)
        if(checkPlateNumber.length != 0){
            res.json({
                status: false, 
                message: "Plate Number is exist"
            })
        } else {
            const addData = await model.createRider({
                name: name, 
                plate_number: plate_number, 
                vehicle: vehicle, 
                rating: 0,
                riding_status: false
            })

            res.json({
                status: true, 
                message: "Added data successfully"
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

const detailRider = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {id} = req.params
        const data = await model.findRiderById(id)

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

const editRider = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {id} = req.params
        let {name, plate_number, vehicle, rating, riding_status} = req.body

        const checkData = await model.findRiderById(id)
        if(checkData.length != 0){
            const checkPlateNumber = await model.findRiderByPlateNumber(plate_number)
            if(checkPlateNumber.length != 0){
                if(checkPlateNumber[0].id != id){
                    res.json({
                        status: false, 
                        message: "Plate number is exist"
                    })
                } 
            }
            

            const editRider = await model.updateRider({
                name: name,
                plate_number: plate_number,
                vehicle: vehicle,
                rating: rating,
                riding_status: riding_status
            }, id)

            res.json({
                status: true, 
                message: "Data updated succesfully"
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

const deleteRider = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {id} = req.params
        const checkData = await model.findRiderById(id)
        if(checkData.length != 0){
            const deleteData = await model.deleteRider(id)

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
    getAllRider, createRider, detailRider, editRider, deleteRider
}