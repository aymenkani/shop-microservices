import { Message } from 'node-nats-streaming'
import {Listener, OrderCreatedEvent, Subjects } from '@gnshop/common';
import { queueGroupName } from './queue-group-name';
import { Product } from '../../models/product';
import { ProductCreatedPublisher } from '../publishers/product-created-publisher';
import { natsWrapper } from '../../nats-wrapper';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message){
        const product = await Product.findById(data.id)

        if(!product) throw new Error('Product not found')


        product.set({ reserved: data.product.reserved + data.orderedQuantity });

        await product.save();

        // publish an event saying that product has bean updated
        new ProductCreatedPublisher(natsWrapper.client).publish({
            title: product.title,
            id: product.id,
            quantity: product.quantity,
            price: product.price,
            userId: product.userId,        
        })

        msg.ack();
    }
}