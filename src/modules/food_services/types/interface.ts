export interface dataFoodOrder {
    user_id: any, 
    merchant_id: String, 
    distance: String, 
    address: String, 
    status: Number, 
    fare: Number
}

export interface dataFoodOrderDetail {
    food_id: String,  
    quantity: String, 
}

export interface dataFoodMerchant {
    merchant_id: any, 
    name: String, 
    price: Number, 
    image_url: String, 
    status: Boolean, 
    food_type: Number
}