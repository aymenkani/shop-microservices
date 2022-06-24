import { Subjects, BasePublisher, ExpirationCompleteEvent } from "@gnshop/common";

export class ExpirationCompletePublisher extends BasePublisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
}
