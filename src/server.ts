import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import categories from './handlers/categories';
import dashboard from './handlers/dashboard';
import orders from './handlers/orders';
import products from './handlers/products';
import users from './handlers/users';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server is running and ready on: http://localhost:${port}`);
});

app.use('/categories', categories);
app.use('/dashboard', dashboard);
app.use('/orders', orders);
app.use('/products', products);
app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;