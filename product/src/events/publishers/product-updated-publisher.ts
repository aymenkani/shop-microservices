import { BasePublisher, ProductUpdatedEvent, Subjects } from '@gnshop/common'

export class ProductUpdatedPublisher extends BasePublisher<ProductUpdatedEvent> {
    readonly subject = Subjects.ProductUpdated;
}
