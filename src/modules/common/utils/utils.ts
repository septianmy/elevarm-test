import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as authConfig from '../../../../config/authConfig'
import * as model from "../models/models"
import axios from 'axios';

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
    console.log(token)
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

export async function getDistance(origin_address: any, destination_address: any) {
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin_address as string)}&destinations=${encodeURIComponent(destination_address as string)}&key=${process.env.GOOGLE_API_KEY}`
    );

    let distance_text = response.data.rows[0].elements[0].distance.text
    let distance_value = response.data.rows[0].elements[0].distance.value

    return {
        text : distance_text, 
        value : distance_value
    }
}

export async function getFare(distance: any){
    type EnvNumber = number | undefined 
    let fare = 0
    let distance_km = distance / 1000
    const baseFare: EnvNumber = process.env.BASE_FARE ? parseInt(process.env.BASE_FARE) : 0;
    const dataFare = await model.findFare()

    if(dataFare.length != 0){
        fare = dataFare[0].fare_per_km * distance_km
    } else {
        fare = baseFare
    }
    
    return fare
}
