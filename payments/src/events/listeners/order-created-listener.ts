import { Listener, OrderCreatedEvent, Subjects } from '@gnshop/common'
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName;
    
    async onMessage(data: OrderCreatedEvent['data'], msg: Message ) {

        const order = await Order.build({
            id: data.id,
            version: data.version,
            status: data.status,
            userId: data.userId,
            orderedQuantity: data.orderedQuantity,
            price: data.product.price
        });

        await order.save()

        msg.ack();
    }
}