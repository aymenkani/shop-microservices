import { Message } from 'node-nats-streaming'
import {Listener, OrderCancelledEvent, Subjects } from '@gnshop/common';
import { queueGroupName } from './queue-group-name';
import { Product } from '../../models/product';
import { ProductUpdatedPublisher } from '../publishers/product-updated-publisher';
import { natsWrapper } from '../../nats-wrapper';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCancelledEvent['data'], msg: Message){
        const product = await Product.findById(data.id)

        if(!product) throw new Error('Product not found')

        product.set({ reserved: data.product.reserved - data.orderedQuantity });

        await product.save();

        // publish an event saying that product has bean updated
        new ProductUpdatedPublisher(natsWrapper.client).publish({
            title: product.title,
            id: product.id,
            quantity: product.quantity,
            price: product.price,
            userId: product.userId,        
            reserved: product.reserved || 0,
        })

        msg.ack();
    }
}