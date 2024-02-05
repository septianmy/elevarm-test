import { query } from '../../../../config/baseFunction';

export const findUserById = (id: String) => {
    return query("SELECT id, name, username, email, birth_date, address, phone_number FROM users WHERE id = $1", [id])
}