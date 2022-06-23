import { BasePublisher, OrderCreatedEvent, Subjects } from '@gnshop/common'

export class OrderCreatedPublisher extends BasePublisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}
