import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as authConfig from '../../../../config/authConfig'
import * as model from "../models/models"

export async function comparePassword(password: any, password_user: any): Promise<boolean>{
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, password_user, async (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        })
    })
}

export async function hashPassword(password: any) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

export async function createToken(payload: any) {
    const token = jwt.sign(payload, authConfig.secret);
    return token
}

export async function createTokenAdmin(payload: any) {
    const token = jwt.sign(payload, authConfig.secretAdmin);
    return token
}

export async function createTokenRider(payload: any) {
    const token = jwt.sign(payload, authConfig.secretRiderToken);
    return token
}

export async function createTokenMerchant(payload: any) {
    const token = jwt.sign(payload, authConfig.secretMerchantToken);
    return token
}

export async function verifyToken(token_client: any){
    let resultToken = ''
    jwt.verify(token_client, authConfig.secret, (err: any, result: any) => {
        if (err) {
            return false
        }
        resultToken = result.id_client
    });
    return resultToken
}

export async function verifyTokenAdmin(token_client: any){
    let resultToken = ''
    jwt.verify(token_client, authConfig.secretAdmin, (err: any, result: any) => {
        if (err) {
            return false
        }
        resultToken = result.id_client
    });
    return resultToken
}

export async function verifyTokenRider(token_client: any){
    let resultToken = ''
    jwt.verify(token_client, authConfig.secretRiderToken, (err: any, result: any) => {
        if (err) {
            return false
        }
        resultToken = result.id_client
    });
    return resultToken
}

export async function verifyTokenMerchant(token_client: any){
    let resultToken = ''
    jwt.verify(token_client, authConfig.secretMerchantToken, (err: any, result: any) => {
        if (err) {
            return false
        }
        resultToken = result.id_client
    });
    return resultToken
}

export async function getFare(distance: any){
    let fare = null
    let distance_km = distance / 1000

    const dataFare = await model.findFare()

    if(dataFare.length != 0){
        fare = dataFare[0].fare_per_km * distance_km
    } else {
        fare = process.env.BASE_FARE
    }
    
    return fare
}