import { query } from '../../../../config/baseFunction';
import { dataAdmin } from '../types/model';

export const findAdminByUsername = (username: String) => {
    return query('SELECT id, username, password FROM admins WHERE username=$1', [username])
}

export const createAdmin = (params: dataAdmin) => {
    return query('INSERT INTO admins(name, username, password, email, role) VALUES($1, $2, $3, $4, $5)', [params.name, params.username, params.password, params.email, params.role])
}