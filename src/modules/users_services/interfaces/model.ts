export interface dataUser {
    name: String, 
    username: String, 
    password: String, 
    email: String, 
    birth_date: Date, 
    address: String, 
    phone_number: String | Number, 
    user_type: Number
}

export interface dataRider {
    user_id: any, 
    driving_license_number: Number, 
    plate_number: String, 
    vehicle: String
}

export interface dataMerchant {
    user_id: any, 
    merchant_name: String, 
    merchant_address: String, 
}