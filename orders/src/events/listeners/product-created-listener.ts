import { Subjects, Listener, ProductCreatedEvent, NotFoundError } from '@gnshop/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Product } from '../../models/product';

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
    readonly subject = Subjects.ProductCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: ProductCreatedEvent['data'], msg: Message) {
        const product = await Product.findById(data.id);

        if(!product) throw new NotFoundError();

        product.set({
            title: data.title,
            price: data.price,
            quantity: data.quantity,
            userId: data.userId
        })

        await product.save();

        msg.ack()

    }
    
}
