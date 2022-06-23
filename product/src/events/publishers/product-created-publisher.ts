import { BasePublisher, ProductCreatedEvent, Subjects } from '@gnshop/common'

export class ProductCreatedPublisher extends BasePublisher<ProductCreatedEvent> {
    readonly subject = Subjects.ProductCreated;
}
