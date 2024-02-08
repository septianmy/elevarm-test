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
                    message: "Unauthorized 2"
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

const authRiderMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const clientToken = req.headers['rider-token'];
        if (!clientToken) {
            return res.status(401).json({ message: 'Rider token missing' });
        }

        let verifyToken = await utils.verifyTokenRider(clientToken)

        if(verifyToken != ''){
            const checkDataRider = await model.findRiderById(verifyToken)
            if(checkDataRider.length != 0){
                req.user = checkDataRider[0].id;
                next()
            } else {
                res.send({
                    status: false, 
                    message: "Unauthorized"
                })
            }
        } else {
            console.log(verifyToken)
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
}

const authMerchantMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const clientToken = req.headers['merchant-token'];
        if (!clientToken) {
            return res.status(401).json({ message: 'Merchant token missing' });
        }

        let verifyToken = await utils.verifyTokenMerchant(clientToken)

        if(verifyToken != ''){
            const checkDataMerchant = await model.findMerchantById(verifyToken)
            if(checkDataMerchant.length != 0){
                req.user = checkDataMerchant[0].id;
                next()
            } else {
                res.send({
                    status: false, 
                    message: "Unauthorized"
                })
            }
        } else {
            console.log(verifyToken)
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
}


export {
    authClientMiddleware, 
    authAdminMiddleware, 
    authRiderMiddleware, 
    authMerchantMiddleware
} ;