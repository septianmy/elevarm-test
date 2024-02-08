import { query } from '../../../../config/baseFunction';
import { dataRideOrder } from '../types/interface';

export const begin = () => {
    return query('BEGIN', '')
}

export const commit = () => {
    return query('COMMIT', '')
}

export const rollback = () => {
    return query('ROLLBACK', '')
}

export const getRider = () => {
    return query('SELECT id FROM riders WHERE riding_status = false LIMIT 1', [])
}

export const createOrder = (params: dataRideOrder) => {
    return query(`INSERT 
                    INTO ride_orders(
                        customer_id, 
                        origin_address, 
                        destination_address, 
                        distance, 
                        fare, 
                        rider_id, 
                        order_type, 
                        status, 
                        food_order_id
                    ) 
                    VALUES(
                        $1, $2, $3, $4, $5, $6, $7, $8, $9
                    )  RETURNING id`, [
                            params.customer_id, 
                            params.origin_address, 
                            params.destination_address, 
                            params.distance, 
                            params.fare, 
                            params.rider_id, 
                            params.order_type, 
                            params.status, 
                            params.food_order_id
                    ])
}

export const detailOrder = (id: String, user_id: any) => {
    return query('SELECT * FROM ride_orders WHERE id = $1 AND customer_id=$2', [id, user_id])
}

//rider query
export const updateRidingStatus = (id: any, status: Boolean) => {
    return query('UPDATE riders SET riding_status=$1 WHERE id = $2', [status, id])
}

export const findOrderRideById = (id: String, rider_id: any) => {
    return query('SELECT id, status FROM ride_orders WHERE id= $1 AND rider_id=$2', [id, rider_id])
}

export const getOrderRequestRider = (rider_id: any) => {
    return query(`SELECT 
                        ro.id,
                        u.name AS customer_name, 
                        u.phone_number AS customer_phone_number,
                        ro.origin_address, 
                        ro.destination_address, 
                        ro.distance, 
                        ro.fare, 
                        ro.order_type, 
                        ro.food_order_id
                  FROM ride_orders ro LEFT JOIN users u ON ro.customer_id = u.id WHERE ro.rider_id = $1 AND ro.status = 0 LIMIT 1`, [rider_id])
}

export const updateOrderRequestRider = (id: String, rider_id: any, status: any) => {
    return query('UPDATE ride_orders SET status=$1 WHERE id=$2 AND rider_id=$3',[status, id, rider_id])
}