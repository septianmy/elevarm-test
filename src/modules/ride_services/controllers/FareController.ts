import { NextFunction, Request, Response } from 'express';
import CustomRequest from '../../common/types/CustomRequest';

import axios from 'axios';
import { getFare } from '../../common/utils/utils';

const checkFare = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let {origin_address, destination_address} = req.body

        if (!origin_address || !destination_address) {
            return res.json({
                status: false, 
                message: "Both start and destination addresses are required"
            })
        }

        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin_address as string)}&destinations=${encodeURIComponent(destination_address as string)}&key=${process.env.GOOGLE_API_KEY}`
        );

        const distance = response.data.rows[0].elements[0].distance.text;
        const fare = await getFare(response.data.rows[0].elements[0].distance.value)

        res.json({
            status: true,
            message: "Data loaded successfully",
            data: {
                origin_address : response.data.origin_addresses[0], 
                destination_address: response.data.destination_addresses[0],
                distance: distance, 
                fare: fare
            }
        })
    } catch (error) {
        res.json({
            status: false, 
            message: "Something Wrong"
        })
    }
}

export {
    checkFare
}