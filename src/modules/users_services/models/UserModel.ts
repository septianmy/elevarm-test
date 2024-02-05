import { query } from '../../../../config/baseFunction';
import { dataUser } from '../interfaces/model';

export const getAllUser = () => {
    return query('SELECT * FROM users', "")
}

export const findUserByUsername = (username: String) => {
    return query("SELECT id, name, email, password FROM users WHERE username = $1", [username])
}

export const createUser = (params: dataUser) => {
    return query("INSERT INTO users(name, username, password, email, birth_date, address, phone_number) VALUES($1, $2, $3, $4, $5, $6, $7)", [params.name, params.username, params.password, params.email, params.birth_date, params.address, params.phone_number])
}

export const findUserById = (id: String) => {
    return query("SELECT name, username, email, birth_date, address, phone_number FROM users WHERE id = $1", [id])
}

export const updateUserById = (params: dataUser, id: String) => {
    return query(`UPDATE users SET name=$1, username=$2, password=$3, email=$4, birth_date=$5, address=$6, phone_number=$7 WHERE id=$8`, 
            [params.name, params.username, params.password, params.email, params.birth_date, params.address, params.phone_number, id])
}

export const deleteUser = (id: String) => {
    return query('DELETE FROM users WHERE id=$1', [id])
}