import { NextFunction, Request, Response } from 'express';
import * as model from "../models/AdminModel"

const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json({
            status: false, 
        })
    } catch (error) {
        res.json({
            status: false, 
            message: "Something Wrong"
        })
    }
}

export {
    signIn
}