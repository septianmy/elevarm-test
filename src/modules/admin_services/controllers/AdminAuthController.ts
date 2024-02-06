import { NextFunction, Request, Response } from 'express';
import * as model from "../models/AdminModel"
import bcrypt from 'bcrypt'
import * as utils from "../../common/utils/utils"

const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {username, password} = req.body
        const checkData = await model.findAdminByUsername(username) 
        if(checkData.length != 0){
            bcrypt.compare(password, checkData[0].password, async (error, result) => {
                if (!result) {
                    return res.status(400).json({ error: 'Incorrect email or password' });
                }
                let id_client = checkData[0].id
                let payload = {id_client}
                let createToken = await utils.createTokenAdmin(payload)

                res.json({
                    status: true, 
                    message: "Login Success", 
                    adminToken: createToken
                })
            })
        } else {
            res.json({
                status: false, 
                message: "Admin not found"
            })
        }
    } catch (error) {
        res.json({
            status: false, 
            message: "Something Wrong"
        })
    }
}

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {username, password, name, email, role} = req.body
        const checkData = await model.findAdminByUsername(username)
        if(checkData.length != 0){
            res.json({
                status: false, 
                message: "Username is exist"
            })
        } else {
            const hashpassword = await utils.hashPassword(password)
            const addData = await model.createAdmin({
                name: name,
                username: username,
                password: hashpassword,
                email: email,
                role: role
            })

            res.json({
                status: true, 
                message: "Sign Up Admin successfully"
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
    signIn, signUp
}