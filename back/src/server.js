//Module installed
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import {PORT, url} from './config';
// Route import
import { anonymeRouteUser } from './Routes/UserRoute';
import { anonymeRouteDrink } from './Routes/DrinkRoute';
import { anonymeRoutePizza } from './Routes/PizzaRoute';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(`${url}/user`, anonymeRouteUser);
app.use(`${url}/drink`, anonymeRouteDrink);
app.use(`${url}/pizza`, anonymeRoutePizza);

app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`));