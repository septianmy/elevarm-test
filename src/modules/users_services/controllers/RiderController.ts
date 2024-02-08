import { NextFunction, Request, Response } from 'express';
import * as model from "../models/UserModel"
import * as utils from "../../common/utils/utils"
import bcrypt from 'bcrypt'

const loginRider = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {username, password} = req.body
        const checkUser = await model.findUserByUsername(username)
        if(checkUser.length != 0){
            const checkPassword = await utils.comparePassword(password, checkUser[0].password)
            if(!checkPassword) {
                res.json({
                    status: false, 
                    message: "Incorrect email or password"
                })
            } else {
                if(checkUser[0].user_type == 2){
                    const checkDataRider = await model.findDataRider(checkUser[0].id)
                    if(checkDataRider.length != 0){
                        let id_client = checkDataRider[0].id
                        let payload = {id_client}
                        let createToken = await utils.createTokenRider(payload)
                        res.json({
                            status: true, 
                            message: "Login Success", 
                            clientToken: createToken
                        })
                    } else {
                        res.json({
                            status: false, 
                            message: "Invalid Data Rider"
                        })
                    }
                } else {
                    res.json({
                        status: false, 
                        message: "User not found", 
                    })
                }
            }
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

const registerRider = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {name, username, email, password, birth_date, address, phone_number, driving_license_number, plate_number, vehicle } = req.body
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
            //create user 
            const addUser = await model.createUser({
                name: name,
                username: username,
                password: hashpassword,
                email: email,
                birth_date: birth_date,
                address: address,
                phone_number: phone_number,
                user_type: 2
            })

            //create data rider
            let user_id = addUser[0].id
            const addDataRider = await model.createDataRider({
                user_id: user_id,
                driving_license_number: driving_license_number,
                plate_number: plate_number,
                vehicle: vehicle
            })

            await model.commit()
            res.json({
                status: true, 
                message: "Register Rider Successfully",
                data: {
                    user_id : user_id
                }
            })
        }
    } catch (error) {
        console.log(error)
        await model.rollback()
        res.json({
            status: false, 
            message: "Something Wrong"
        })
    }
}

export {
    loginRider, registerRider
}