import { BasePublisher, OrderCancelledEvent, Subjects } from '@gnshop/common'

export class OrderCancelledPublisher extends BasePublisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}
