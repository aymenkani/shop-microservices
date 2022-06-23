import { NotFoundError } from '@gnshop/common';
import express, { Response, Request, NextFunction } from 'express';
import { Order } from '../models/order';

const router = express.Router()

router.get('/api/orders/:id', async ( req: Request, res: Response, next: NextFunction ) => {
    const order = await Order.findById(req.params.id);

    if(!order) throw new NotFoundError();

    res.status(200).send(order);
})

export { router as showOrderRouter}