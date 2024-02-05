import { NextFunction, Request, Response } from 'express';
import CustomRequest from '../../common/types/CustomRequest';
import * as model from "../models/UserModel"
import bcrypt from 'bcrypt'
import * as utils from "../../common/utils/utils"

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {username, password} = req.body
        const checkUser = await model.findUserByUsername(username)
        if(checkUser.length != 0){
            bcrypt.compare(password, checkUser[0].password, async (error, result) => {
                if (!result) {
                    return res.status(400).json({ error: 'Incorrect email or password' });
                }
                let id_client = checkUser[0].id
                let payload = {id_client}
                console.log("payload",payload)
                let createToken = await utils.createToken(payload)

                res.json({
                    status: true, 
                    message: "Login Success", 
                    clientToken: createToken
                })
            })
        } else {
            res.json({
                status: false, 
                message: "User not found"
            })
        }
    } catch (error) {
        res.json({
            status: false,
            message: "Something Wrong"
        })
    }
}

const listUser = async (req: CustomRequest, res: Response) => {
    try {
        const data = await model.getAllUser()
        if(data.length != 0){
            res.json({
                status: true, 
                message: "List User", 
                data: data
            })
        } else {
            res.json({
                status: false, 
                message: "Data not found", 
            })
        }
        
    } catch (error) {
        res.json({
            status: false, 
            message: 'Something Wrong'
        })
    }
}

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {name, username, email, password, birth_date, address, phone_number} = req.body
        const hashpassword = await utils.hashPassword(password)

        const addData = await model.createUser({
            name: name,
            username: username,
            password: hashpassword,
            email: email,
            birth_date: new Date(birth_date),
            address: address,
            phone_number: phone_number
        })

        res.json({
            status: true, 
            message: "Data added succesfully"
        })
    } catch (error) {
        res.json({
            status: false, 
            message: 'Something Wrong'
        })
    }
}

const detailUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {id} = req.params
        const data = await model.findUserById(id)

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

const editUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {id} = req.params
        let {name, username, email, password, birth_date, address, phone_number} = req.body

        const checkUser = await model.findUserById(id)
        if(checkUser.length != 0){
            if(checkUser[0].password != password){
                const hashpassword = await utils.hashPassword(password)
                password = hashpassword
            } 

            const editData = await model.updateUserById({
                name: name,
                username: username,
                password: password,
                email: email,
                birth_date: birth_date,
                address: address,
                phone_number: phone_number
            }, id)
    
            res.json({
                status: true, 
                message: "Data updated successfully"
            })
        } else {
            res.json({
                status: false, 
                message: "User not found"
            })
        }
        
    } catch (error) {
        console.log(error)
        res.json({
            status: false, 
            message: 'Something Wrong'
        })
    }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {id} = req.params
        const checkData = await model.findUserById(id)
        if(checkData.length != 0){
            const deleteData = await model.deleteUser(id)
            res.json({
                status: true, 
                message: "Data deleted successfully"
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
    login, listUser, registerUser, detailUser, editUser, deleteUser
}