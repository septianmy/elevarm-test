import express, {Request, Response, NextFunction} from "express"
import bodyParser from 'body-parser';
import userModule from '../src/modules/users_services/';
import adminModule from '../src/modules/admin_services/';
import foodServicesModule from '../src/modules/food_services'
import rideServiceModule from "./modules/ride_services";

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../config/swagger';

const app = express()
const port = 3000
app.use(bodyParser.json());

app.use(userModule);
app.use(adminModule);
app.use(foodServicesModule)
app.use(rideServiceModule)


app.get('/', (req: Request, res: Response) => {
    res.send('Gojek App Services');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);
});