import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as authConfig from '../../../../config/authConfig'

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