import { query } from '../../../../config/baseFunction';
import { dataFoodOrderDetail, dataFoodOrder } from '../types/interface';

export const begin = () => {
    return query('BEGIN', '')
}

export const commit = () => {
    return query('COMMIT', '')
}

export const rollback = () => {
    return query('ROLLBACK', '')
}

export const findMerchantById = (id: String) => {
    return query('SELECT id, merchant_name, address FROM merchants WHERE id = $1', [id])
}

export const createFoodOrder = (params: dataFoodOrder) => {
    return query(`INSERT INTO food_orders(user_id, merchant_id, origin_address, destination_address, distance, fare, status) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id`, 
                [params.user_id, params.merchant_id, params.origin_address, params.destination_address, params.distance, params.fare, params.status])
}

export const insertManyFoodOrderDetail = async (order_id: String, params: dataFoodOrderDetail[]) => {
    const foodIds = params.map(item => item.food_id);
    const foodPricesQuery = `SELECT id, price FROM food WHERE id IN (${foodIds.map((_, index) => `$${index + 1}`).join(', ')})`;
    const foodPrices = await query(foodPricesQuery, foodIds);
    const rowsToInsert = params.map(orderItem => {
        const foodPrice = foodPrices.find((food: { id: String; }) => food.id === orderItem.food_id);
        if (!foodPrice) {
            throw new Error(`Price not found for food ID: ${orderItem.food_id}`);
        }
        return [order_id, orderItem.food_id, foodPrice.price, orderItem.quantity];
    });

    const queryString = 'INSERT INTO food_order_details (food_order_id, food_id, price, quantity) VALUES ' +
    rowsToInsert.map((_, index) => `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${index * 4 + 4})`).join(', ');

    const value_detail_order = rowsToInsert.reduce((acc, row) => [...acc, ...row], []);

    await query(queryString, value_detail_order);
}

export const findFoodOrderByIdforUser = async (id: String, user_id: any) => {
    return query(`SELECT 
                    f.id,
                    f.user_id, 
                    u.name, 
                    f.merchant_id, 
                    m.merchant_name, 
                    m.address,
                    f.distance, 
                    f.fare,
                    f.status, 
                    COUNT(fd.id) AS total_item, 
                    CASE 
                        WHEN COUNT(fd.id) = 0 THEN '[]'::json
                    ELSE 
                        JSON_AGG(JSON_BUILD_OBJECT(
                            'id',fd.id,
                            'food_id',fd.food_id, 
                            'food_name', mf.name, 
                            'price', fd.price, 
                            'quantity', fd.quantity
                        ))  
                    END AS order_items
                FROM 
                    food_orders f
                LEFT JOIN users u ON f.user_id = u.id
                LEFT JOIN merchants m ON f.merchant_id = m.id
                LEFT JOIN food_order_details fd ON f.id = fd.food_order_id
                LEFT JOIN food mf ON fd.food_id = mf.id
                WHERE 
                    f.id = $1 AND f.user_id = $2
                    
                GROUP BY f.id, u.name, m.merchant_name, m.address`, [id, user_id])
}

export const listOrderMerchant = async (merchant_id: any, status: any) => {
    return query(`SELECT 
                    f.id,
                    f.user_id, 
                    u.name, 
                    f.merchant_id, 
                    m.merchant_name, 
                    m.address,
                    f.distance, 
                    f.fare,
                    f.status, 
                    COUNT(fd.id) AS total_item, 
                    CASE 
                        WHEN COUNT(fd.id) = 0 THEN '[]'::json
                    ELSE 
                        JSON_AGG(JSON_BUILD_OBJECT(
                            'id',fd.id,
                            'food_id',fd.food_id, 
                            'food_name', mf.name, 
                            'price', fd.price, 
                            'quantity', fd.quantity
                        ))  
                    END AS order_items
                  FROM 
                    food_orders f
                  LEFT JOIN users u ON f.user_id = u.id
                  LEFT JOIN merchants m ON f.merchant_id = m.id
                  LEFT JOIN food_order_details fd ON f.id = fd.food_order_id
                  LEFT JOIN food mf ON fd.food_id = mf.id
                  WHERE 
                    f.merchant_id = $1 AND f.status = $2
                  GROUP BY f.id, u.name, m.merchant_name, m.address`, [merchant_id, status])
}

export const detailOrderMerchant = async (id: String, merchant_id: any) => {
    return query(`SELECT 
                    f.id,
                    f.user_id, 
                    u.name, 
                    f.merchant_id, 
                    m.merchant_name, 
                    m.address,
                    f.origin_address, 
                    f.destination_address,
                    f.distance, 
                    f.fare,
                    f.status, 
                    COUNT(fd.id) AS total_item, 
                    CASE 
                        WHEN COUNT(fd.id) = 0 THEN '[]'::json
                    ELSE 
                        JSON_AGG(JSON_BUILD_OBJECT(
                            'id',fd.id,
                            'food_id',fd.food_id, 
                            'food_name', mf.name, 
                            'price', fd.price, 
                            'quantity', fd.quantity
                        ))  
                    END AS order_items
                  FROM 
                    food_orders f
                  LEFT JOIN users u ON f.user_id = u.id
                  LEFT JOIN merchants m ON f.merchant_id = m.id
                  LEFT JOIN food_order_details fd ON f.id = fd.food_order_id
                  LEFT JOIN food mf ON fd.food_id = mf.id
                  WHERE 
                    f.id = $1 AND f.merchant_id = $2
                  GROUP BY f.id, u.name, m.merchant_name, m.address`, [id, merchant_id])
}

export const updateOrderMerchant = async (status: any, rider_order_id: any, id: String, merchant_id: any) => {
    return query('UPDATE food_orders SET status = $1, ride_order_id = $2 WHERE id=$3 AND merchant_id=$4', [status,rider_order_id, id, merchant_id])
}