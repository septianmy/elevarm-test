export interface dataFoodOrder {
    user_id: any, 
    merchant_id: String, 
    distance: String, 
    origin_address: String, 
    destination_address: String, 
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

export interface OrderItem {
    food_id: string;
    quantity: number;
}

export interface payloadCheckFareFood {
    merchant_id: string;
    destination_address: string;
    list_order: OrderItem[];
}