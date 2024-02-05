import { query } from '../../../../config/baseFunction';
import { dataFoodMerchant } from '../types/model';

export const getFoodMerchantAll = () => {
    return query('SELECT food.id, merchants.merchant_name, food.name, food.price, food.status, food.food_type FROM food LEFT JOIN merchants ON food.merchant_id = merchants.id', '')
}

export const createFoodMerchant = (params: dataFoodMerchant) => {
    return query('INSERT INTO food (merchant_id, name, price, image_url, status, food_type) VALUES ($1, $2, $3, $4, $5, $6)', [params.merchant_id, params.name, params.price, params.image_url, params.status, params.food_type])
}

export const findFoodMerchantById = (id: String) => {
    return query('SELECT food.id, merchants.merchant_name, food.name, food.price, food.status, food.food_type FROM food LEFT JOIN merchants ON food.merchant_id = merchants.id WHERE food.id = $1', [id] )
}

export const updateFoodMerchantById = (params: dataFoodMerchant, id: String) => {
    return query('UPDATE food SET merchant_id=$1, name=$2, price=$3, image_url=$4, status=$5, food_type=$6 WHERE id=$7',[params.merchant_id, params.name, params.price, params.image_url, params.status, params.food_type, id])
}

export const deleteFoodMerchantById = (id: String) => {
    return query('DELETE FROM food WHERE id=$1', [id])
}