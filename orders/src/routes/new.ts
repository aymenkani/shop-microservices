import { 
    requireAuth,
    NotFoundError, 
    BadRequestError, 
    OrderStatus,
} from '@gnshop/common';
import express, { Response, Request, NextFunction } from 'express';
import { Product } from '../models/product';
import { Order } from '../models/order';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';

import { natsWrapper } from '../nats-wrapper';

const router = express.Router()

const EXPIRATION_WINDOW_SECONDS = 30 * 60

router.post('/api/orders', requireAuth, async (req: Request, res: Response, next: NextFunction ) => {

    const { productId, orderedQuantity }  = req.body;

    const product = await Product.findById(productId);

    if(!product) throw new NotFoundError();

    const { isAvailable, availableQuantity } = product.isAvailable(orderedQuantity)

    if(!isAvailable) {
        throw new BadRequestError(`${availableQuantity} quantity is only available at the moment`);
    }

    // set expiration time
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // create order
    const order = Order.build({
        userId: req.currentUser!.id,
        status: OrderStatus.Created,
        expiresAt: expiration,
        orderedQuantity,
        product
    });

    await order.save();

    // publish event saying that a new order has bean created
    // so that we can cancel the order after the expiration time
    new OrderCreatedPublisher(natsWrapper.client).publish({
    
        id: order.id,
        version: order.version,
        status: order.status,
        userId: req.currentUser!.id,
        expiresAt: order.expiresAt?.toISOString() || '',
        orderedQuantity,
        product: {
            id: product.id,
            quantity: product.quantity,
            price: product.price,
            reserved: product.reserved
        }
    
    })

    res.status(200).send(order);



});

export { router as newOrderRouter };
