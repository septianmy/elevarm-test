import express, {Request, Response, NextFunction} from "express"
import bodyParser from 'body-parser';
import userModule from '../src/modules/users_services/';
import adminModule from '../src/modules/admin_services/';

const app = express()
const port = 3000
app.use(bodyParser.json());

app.use(userModule);
app.use(adminModule);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript and Express!');
});

app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);
});