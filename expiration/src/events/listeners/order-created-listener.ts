import { IOrderCreatedEvent, Subjects } from "@ticketing-nir/common";
import Listener from "@ticketing-nir/common/build/events/base-listener";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<IOrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: IOrderCreatedEvent["data"], msg: Message): Promise<void> {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    await expirationQueue.add({ orderId: data.id }, { delay });
    msg.ack();
  }
}
