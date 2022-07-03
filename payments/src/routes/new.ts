import { requireAuth, NotFoundError, NotAuthorizedError, BadRequestError } from '@gnshop/common'
import express, { Request, Response, NextFunction } from 'express'
import { Order } from '../models/order';
import { Payment } from '../models/payment';
import { OrderStatus } from '@gnshop/common';
import { stripe } from '../stripe';
import { natsWrapper } from '../nats-wrapper';
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher'

const router = express.Router()

router.post('/api/payments', requireAuth , async (req: Request, res: Response, next: NextFunction) => {
    const { orderId, token } = req.body;

    const order = await Order.findById(orderId);

    if(!order) throw new NotFoundError();

    if(order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError()
    }

    if(order.status === OrderStatus.Cancelled ) {
        throw new BadRequestError('Cannot pay for a cancelled order')
    }

    const charge = await stripe.charges.create({
        currency: 'usd',
        amount: order.price * 100,
        source: token,
    })

    const payment = await Payment.build({
        orderId, stripeId: charge.id
    });

    await payment.save();

    new PaymentCreatedPublisher(natsWrapper.client).publish({
        id: payment.id,
        orderId,
        stripeId: charge.id
    })

    res.status(201).send({ id: payment.id })

} );

export { router as newPaymentRouter }
