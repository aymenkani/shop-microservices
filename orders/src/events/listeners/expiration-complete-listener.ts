import { Subjects, Listener, ExpirationCompleteEvent, NotFoundError } from '@gnshop/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Order, OrderStatus } from '../../models/order';
import { OrderCancelledPublisher } from '../publishers/order-cancelled-publisher';
import { natsWrapper } from '../../nats-wrapper';

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
    queueGroupName = queueGroupName;

    async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
        const order = await Order.findById(data.orderId).populate('product');

        if(!order) throw new NotFoundError();

        if(order.status === OrderStatus.Complete) {
            return msg.ack();
        }

        const product = order.product;

        order.set({
            status: OrderStatus.Cancelled
        })

        await order.save();

        new OrderCancelledPublisher(natsWrapper.client).publish({
            id: order.id,
            version: order.version,
            status: order.status,
            userId: order.userId,
            product: {
                id: product.id,
                quantity: product.quantity,
                price: product.price,
                reserved: product.reserved
            }
        })

        msg.ack()

    }
    
}
