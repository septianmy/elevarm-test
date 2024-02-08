import { query } from '../../../../config/baseFunction';

export const findUserById = (id: String) => {
    return query("SELECT id, name, username, email, birth_date, address, phone_number FROM users WHERE id = $1", [id])
}

export const findAdminById = (id: String) => {
    return query('SELECT id, username, password FROM admins WHERE id=$1', [id])
}

export const findRiderById = (id: String) => {
    return query('SELECT id, user_id FROM riders WHERE id=$1', [id])
}

export const findFare = () => {
    return query('SELECT fare_per_km FROM master_fare', [])
}