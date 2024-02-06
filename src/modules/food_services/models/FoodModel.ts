import { query } from '../../../../config/baseFunction';

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