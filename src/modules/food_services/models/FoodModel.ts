import { query } from '../../../../config/baseFunction';
import { dataFoodMerchant } from '../types/interface';

export const begin = () => {
    return query('BEGIN', '')
}

export const commit = () => {
    return query('COMMIT', '')
}

export const rollback = () => {
    return query('ROLLBACK', '')
}

export const listMerchant = () => {
    return query('SELECT merchants.id, merchants.merchant_name, merchants.address, merchants.rating, COUNT(food.id) as total_food_item FROM merchants LEFT JOIN food ON merchants.id = food.merchant_id GROUP BY merchants.id', '')
}

export const detailMerchant = (id: String) => {
    return query(`SELECT 
                    merchants.merchant_name, 
                    merchants.address,
                    COUNT(food.id) AS total_item, 
                    CASE 
                        WHEN COUNT(food.id) = 0 THEN '[]'::json
                    ELSE 
                        JSON_AGG(JSON_BUILD_OBJECT('id',food.id,'food_name', food.name, 'price', food.price))  
                    END AS food_items
                FROM 
                    merchants 
                LEFT JOIN food ON merchants.id = food.merchant_id 
                WHERE merchants.id=$1 
                GROUP BY merchants.id`, [id])
}

export const listFoods = () => {
    return query('SELECT food.id, food.name, food.price, food.image_url, merchants.merchant_name, merchants.address FROM food LEFT JOIN merchants ON food.merchant_id = merchants.id', [])
}

export const detailFoods = (id: String) => {
    return query(`SELECT food.id, food.name, food.price, food.image_url, merchants.merchant_name, merchants.address FROM food LEFT JOIN merchants ON food.merchant_id = merchants.id WHERE food.id=$1`, [id])
}

export const compareFoodIdAndMerchant = (food_id:any, merchant_id: any) => {
    return query('SELECT COUNT(*) AS count FROM food WHERE id = $1 AND merchant_id = $2', [food_id, merchant_id])
}

export const findPriceFoodById = (id: any) => {
    return query('SELECT price FROM food WHERE id = $1', [id])
}

//CRUD Food Merchant 
export const listFoodMerchant = (merchant_id: any) => {
    return query('SELECT food.id, merchants.merchant_name, food.name, food.price, food.status, food.food_type FROM food LEFT JOIN merchants ON food.merchant_id = merchants.id WHERE merchants.id = $1', [merchant_id])
}

export const createFoodMerchant = (params: dataFoodMerchant) => {
    return query('INSERT INTO food (merchant_id, name, price, image_url, status, food_type) VALUES ($1, $2, $3, $4, $5, $6)', [params.merchant_id, params.name, params.price, params.image_url, params.status, params.food_type])
}

export const findFoodMerchantById = (id: String, merchant_id: any) => {
    return query('SELECT food.id, merchants.merchant_name, food.name, food.price, food.status, food.food_type FROM food LEFT JOIN merchants ON food.merchant_id = merchants.id WHERE food.id = $1 AND merchant_id = $2', [id, merchant_id] )
}

export const updateFoodMerchantById = (params: dataFoodMerchant, id: String) => {
    return query('UPDATE food SET merchant_id=$1, name=$2, price=$3, image_url=$4, status=$5, food_type=$6 WHERE id=$7',[params.merchant_id, params.name, params.price, params.image_url, params.status, params.food_type, id])
}

export const deleteFoodMerchantById = (id: String, merchant_id: any) => {
    return query('DELETE FROM food WHERE id=$1 AND merchant_id = $2', [id, merchant_id])
}