import { query } from '../../../../config/baseFunction';
import { dataRider } from '../types/model';

export const getAllRider = () => {
    return query('SELECT * FROM riders','')
}

export const findRiderByPlateNumber = (plate_number: String) => {
    return query('SELECT id FROM riders WHERE plate_number = $1', [plate_number])
}

export const findRiderById = (id: String) => {
    return query('SELECT name, plate_number, vehicle, rating, riding_status FROM riders WHERE id=$1', [id])
}

export const createRider = (params: dataRider) => {
    return query('INSERT INTO riders(name, plate_number, vehicle, rating, riding_status) VALUES($1, $2, $3, $4, $5)', [params.name, params.plate_number, params.vehicle, params.rating, params.riding_status])
}

export const updateRider = (params: dataRider, id: String) => {
    return query('UPDATE riders SET name=$1, plate_number=$2, vehicle=$3, rating=$4, riding_status=$5 WHERE id=$6', [params.name, params.plate_number, params.vehicle, params.rating, params.riding_status, id])
}

export const deleteRider = (id: String) => {
    return query('DELETE FROM riders WHERE id=$1', [id])
}