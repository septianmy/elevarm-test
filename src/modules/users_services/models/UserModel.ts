import { query } from '../../../../config/baseFunction';
import { dataUser, dataRider } from '../interfaces/model';

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

export const findUserById = (id: String) => {
    return query("SELECT name, username, email, birth_date, address, phone_number FROM users WHERE id = $1 RETURNING id", [id])
}

export const updateUserById = (params: dataUser, id: String) => {
    return query(`UPDATE users SET name=$1, username=$2, password=$3, email=$4, birth_date=$5, address=$6, phone_number=$7 WHERE id=$8`, 
            [params.name, params.username, params.password, params.email, params.birth_date, params.address, params.phone_number, id])
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