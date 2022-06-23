import { Subjects, Listener, ProductUpdatedEvent, NotFoundError } from '@gnshop/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Product } from '../../models/product';

export class ProductUpdatedListener extends Listener<ProductUpdatedEvent> {
    readonly subject = Subjects.ProductUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: ProductUpdatedEvent['data'], msg: Message) {
        const product = await Product.findById(data.id);

        if(!product) throw new NotFoundError();

        product.set({
            title: data.title,
            price: data.price,
            quantity: data.quantity,
            reserved: data.reserved
        })

        await product.save();

        msg.ack()

    }
    
}
