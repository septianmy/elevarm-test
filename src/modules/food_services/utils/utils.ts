import { OrderItem, payloadCheckFareFood } from '../types/interface';
import * as model from "../models/FoodModel"

export const getTotalFoodOrder = async function (payload: payloadCheckFareFood) : Promise<number>{
    let totalPrice = 0;
    for (const orderItem of payload.list_order) {
        const rows = await model.findPriceFoodById(orderItem.food_id)
        if (rows.length === 0) {
            throw new Error(`Food item not found for food ID: ${orderItem.food_id}`);
        }

        const price = rows[0].price;
        totalPrice += price * orderItem.quantity;
    }

    return totalPrice;
}

export const checkPayloadCheckFareFood = async function (payload: payloadCheckFareFood): Promise<void> {
    if (!payload.list_order || !Array.isArray(payload.list_order) || payload.list_order.length === 0) {
        throw new Error('Invalid list_order array');
    }

    for (const orderItem of payload.list_order) {
        const isValidFoodId = await validateFoodId(orderItem.food_id);
        if (!isValidFoodId) {
            throw new Error(`Invalid food_id: ${orderItem.food_id}`);
        }
    }

    const { merchant_id } = payload;
    const foodIds = payload.list_order.map(orderItem => orderItem.food_id);

    for (const foodId of foodIds) {
        const isValidFoodForMerchant = await validateFoodIdForMerchant(foodId, merchant_id);
        if (!isValidFoodForMerchant) {
            throw new Error(`Food ID ${foodId} is not associated with merchant ID ${merchant_id}`);
        }
    }
}

async function validateFoodIdForMerchant(food_id: string, merchant_id: string): Promise<boolean> {
    const rows  = await model.compareFoodIdAndMerchant(food_id, merchant_id)
    return rows[0].count > 0;
}

async function validateFoodId(foodId: string): Promise<boolean> {
    if(!foodId){
        throw new Error(`Invalid payload food_id`)
    } else {
        return true
    }
}