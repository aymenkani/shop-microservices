import express, { Request, Response, NextFunction } from 'express'
import { Order } from '../models/order'

const router = express.Router()

router.get('/api/orders', async ( req:Request, res:Response, next: NextFunction ) => {
    const orders = await Order.find({});

    res.status(200).send(orders)
});

export { router as getOrdersRouter }