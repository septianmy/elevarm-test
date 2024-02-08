import { query } from '../../../../config/baseFunction';
import { dataUser, dataProfileCustomer, dataRider, dataMerchant, dataProfileRider, dataProfileMerchant } from '../interfaces/model';

export const begin = () => {
    return query('BEGIN', '')
}

export const commit = () => {
    return query('COMMIT', '')
}

export const rollback = () => {
    return query('ROLLBACK', '')
}

export const getAllUser = () => {
    return query('SELECT * FROM users', "")
}

export const findUserByUsername = (username: String) => {
    return query("SELECT id, name, email, password, user_type FROM users WHERE username = $1", [username])
}

export const createUser = (params: dataUser) => {
    return query("INSERT INTO users(name, username, password, email, birth_date, address, phone_number, user_type) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id", [params.name, params.username, params.password, params.email, params.birth_date, params.address, params.phone_number, params.user_type])
}

export const findUserById = (id: any) => {
    return query("SELECT name, username, email, birth_date, address, phone_number FROM users WHERE id = $1", [id])
}

export const updateUserById = (params: dataProfileCustomer, id: any) => {
    return query(`UPDATE users SET name=$1, username=$2, email=$3, birth_date=$4, address=$5, phone_number=$6 WHERE id=$7`, 
            [params.name, params.username, params.email, params.birth_date, params.address, params.phone_number, id])
}

export const deleteUser = (id: String) => {
    return query('DELETE FROM users WHERE id=$1', [id])
}

//rider query
export const createDataRider = (params: dataRider) => {
    return query('INSERT INTO riders(user_id, driving_license_number, plate_number, vehicle) VALUES($1, $2, $3, $4)', [params.user_id, params.driving_license_number, params.plate_number, params.vehicle])
}

export const findDataRider = (id: String) => {
    return query('SELECT id FROM riders WHERE user_id = $1', [id])
}

export const findDataRiderByRiderId = (rider_id: any) => {
    return query(`SELECT 
                    r.user_id, u.username, u.name, u.email, u.address, u.phone_number, u.birth_date,
                    r.plate_number, r.vehicle, r.driving_license_number 
                FROM riders r 
                LEFT JOIN users u ON r.user_id = u.id 
                WHERE r.id = $1`, [rider_id])
}

export const updateProfileRider = async (params: dataProfileRider, rider_id: any, user_id: any) => {
    await query(`UPDATE users SET name=$1, username=$2, email=$3, birth_date=$4, address=$5, phone_number=$6 WHERE id=$7`, [params.name, params.username, params.email, params.birth_date, params.address, params.phone_number, user_id])
    await query(`UPDATE riders SET driving_license_number=$1 WHERE id=$2`, [params.driving_license_number, rider_id])
}

//merchant query 
export const createDataMerchant = (params: dataMerchant) => {
    return query('INSERT INTO merchants(user_id, merchant_name, address) VALUES($1, $2, $3)', [params.user_id, params.merchant_name, params.merchant_address])
}

export const findDataMerchant = (id: String) => {
    return query('SELECT id FROM merchants WHERE user_id = $1', [id])
}

export const findDataMerchantByMerchantId = (merchant_id: any) => {
    return query(`SELECT 
                    m.user_id, u.username, u.name, u.email, u.address, u.phone_number, u.birth_date,
                    m.merchant_name, m.address AS merchant_address
                FROM merchants m
                LEFT JOIN users u ON m.user_id = u.id 
                WHERE m.id = $1`, [merchant_id])
}

export const updateProfileMerchant = async (params: dataProfileMerchant, merchant_id: any, user_id: any) => {
    await query(`UPDATE users SET name=$1, username=$2, email=$3, birth_date=$4, address=$5, phone_number=$6 WHERE id=$7`, [params.name, params.username, params.email, params.birth_date, params.address, params.phone_number, user_id])
    await query(`UPDATE merchants SET merchant_name=$1, address=$2 WHERE id=$3`, [params.merchant_name, params.merchant_address, merchant_id])
}
