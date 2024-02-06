import { Request, Response, NextFunction } from 'express';
import * as utils from '../utils/utils'
import * as model from "../models/models"
import CustomRequest from '../types/CustomRequest';

const authClientMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const clientToken = req.headers['client-token'];
        if (!clientToken) {
            return res.status(401).json({ message: 'Client token missing' });
        }

        let verifyToken = await utils.verifyToken(clientToken)

        if(verifyToken != ''){
            const checkDataUser = await model.findUserById(verifyToken)
            if(checkDataUser.length != 0){
                req.user = checkDataUser[0].id;
                next()
            } else {
                res.send({
                    status: false, 
                    message: "Unauthorized"
                })
            }
        } else {
            res.send({
                status: false, 
                message: "Invalid Token"
            })
        }
    } catch (error) {
        res.json({
            status: false, 
            message: "Something Wrong"
        })
    }
};

const authAdminMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const clientToken = req.headers['admin-token'];
        if (!clientToken) {
            return res.status(401).json({ message: 'Admin token missing' });
        }

        let verifyToken = await utils.verifyTokenAdmin(clientToken)

        if(verifyToken != ''){
            const checkDataUser = await model.findAdminById(verifyToken)
            if(checkDataUser.length != 0){
                req.user = checkDataUser[0].id;
                next()
            } else {
                res.send({
                    status: false, 
                    message: "Unauthorized"
                })
            }
        } else {
            res.send({
                status: false, 
                message: "Invalid Token"
            })
        }
    } catch (error) {
        res.json({
            status: false, 
            message: "Something Wrong"
        })
    }
};
export {
    authClientMiddleware, 
    authAdminMiddleware
} ;