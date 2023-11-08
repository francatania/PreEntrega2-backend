import express from 'express';
import productsRouter from './routers/products.router.js';
import handlebars from 'express-handlebars';
import cartRouter from './routers/cart.router.js'
import productsViewRouter from './routers/views/products.router.js'
import cartViewRouter from './routers/views/cart.router.js'
import path from 'path';
import { __dirname } from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '../public')));



app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/api', productsRouter, cartRouter);
app.use('/', productsViewRouter, cartViewRouter)



export default app;