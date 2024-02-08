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
                if(checkUser[0].user_type == 1){
                    let id_client = checkUser[0].id
                    let payload = {id_client}
                    let createToken = await utils.createToken(payload)

                    res.json({
                        status: true, 
                        message: "Login Success", 
                        clientToken: createToken
                    })
                } else {
                    res.json({
                        status: false, 
                        message: "User not found", 
                    })
                }
                
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

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {name, username, email, password, birth_date, address, phone_number} = req.body
        const hashpassword = await utils.hashPassword(password)

        await model.begin()
        const checkUsername = await model.findUserByUsername(username)
        if(checkUsername.length != 0){
            await model.rollback()
            res.json({
                status: false, 
                message: "Username is exist"
            })
        } else {
            const addData = await model.createUser({
                name: name,
                username: username,
                password: hashpassword,
                email: email,
                birth_date: new Date(birth_date),
                address: address,
                phone_number: phone_number, 
                user_type: 1
            })
            
            await model.commit()
            res.json({
                status: true, 
                message: "Data added succesfully"
            })
        }
        
    } catch (error) {
        await model.rollback()
        res.json({
            status: false, 
            message: 'Something Wrong'
        })
    }
}

const detailUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let user_id = req.user
        const data = await model.findUserById(user_id)

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

const editUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let user_id = req.user
        let {name, username, email, birth_date, address, phone_number} = req.body

        const checkUser = await model.findUserById(user_id)
        if(checkUser.length != 0){
            const editData = await model.updateUserById({
                name: name,
                username: username,
                email: email,
                birth_date: birth_date,
                address: address,
                phone_number: phone_number, 
                user_type: 1
            }, user_id)
    
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
    login, registerUser, detailUser, editUser, deleteUser
}