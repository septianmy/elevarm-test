import { query } from '../../../../config/baseFunction';
import { dataMerchant } from '../types/model';
export const getAllMerchant = () => {
    return query('SELECT * FROM merchants', "")
}

export const createMerchant = (params: dataMerchant) => {
    return query('INSERT INTO merchants(merchant_name, address, rating, merchant_type) VALUES($1,$2,$3,$4)', [params.merchant_name, params.address, params.rating, params.merchant_type])
}

export const findMerchantById = (id: String) => {
    return query('SELECT id, merchant_name, address, rating, merchant_type FROM merchants WHERE id=$1', [id])
}

export const updateMerchantById = (params: dataMerchant, id: String) => {
    return query(`UPDATE merchants SET merchant_name=$1, address=$2, rating=$3, merchant_type=$4 WHERE id=$5`, 
            [params.merchant_name, params.address, params.rating, params.merchant_type, id])
}

export const deleteMerchantById = (id: String) => {
    return query('DELETE FROM merchants WHERE id=$1',[id])
}