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