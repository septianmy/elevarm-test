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

export const updateRidingStatus = (id: String) => {
    return query('UPDATE riders SET riding_status=true WHERE id = $1', [id])
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