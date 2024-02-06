export interface dataMerchant {
    merchant_name: String, 
    address: String, 
    rating: Number, 
    merchant_type: Number, 
}

export interface dataFoodMerchant {
    merchant_id: String, 
    name: String, 
    price: Number, 
    image_url: String, 
    status: Boolean, 
    food_type: Number
}

export interface dataRider {
    name: String, 
    plate_number: String, 
    vehicle: String, 
    rating: Number, 
    riding_status: Boolean
}