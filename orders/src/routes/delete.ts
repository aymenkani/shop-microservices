import { NotAuthorizedError, NotFoundError, OrderStatus } from '@gnshop/common';
import express, { Response, Request, NextFunction } from 'express'
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { Order } from '../models/order';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router()

router.delete('/api/orders/:id', async (req: Request, res: Response, next: NextFunction ) => {
    const order = await Order.findById(req.params.id).populate('product');
   
    if(!order) throw new NotFoundError();
    
    const product = order.product;


    if(order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }
    
    order.status = OrderStatus.Cancelled;
    await order.save();

    // publish order cancelled event
    new OrderCancelledPublisher(natsWrapper.client).publish({
        id: order.id,
        version: order.version,
        status: order.status,
        userId: req.currentUser!.id,
        product: {
            id: product.id,
            quantity: product.quantity,
            price: product.price,
            reserved: product.reserved
        }
    
    })

    res.status(204).send(order)

});

export { router as deleteOrderRouter }
