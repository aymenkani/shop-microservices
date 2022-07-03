import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler } from '@gnshop/common';
import { deleteOrderRouter } from './routes/delete';
import { getOrdersRouter } from './routes';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';


const app = express()

app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
)

app.use(deleteOrderRouter)
app.use(getOrdersRouter);
app.use(newOrderRouter);
app.use(showOrderRouter)

app.all('*', async (req, res) => {
    throw new NotFoundError();
})

app.use(errorHandler);

export { app };
