import { Subjects, BasePublisher, PaymentCreatedEvent } from '@gnshop/common';

export class PaymentCreatedPublisher extends BasePublisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
