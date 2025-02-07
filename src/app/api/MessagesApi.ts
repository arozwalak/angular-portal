import {Message} from "@api/models/Message";
import {asyncScheduler, Observable, scheduled} from "rxjs";
import {Injectable} from "@angular/core";
import {faker} from "@faker-js/faker";
import {MessagesFilters} from "@app/inbox/data/messages.store";

@Injectable()
export class MessagesApi {
  getMessages(): Observable<Message[]> {
    return scheduled([this.#generateMessages()], asyncScheduler);
  }

  getMessagesByQuery(filters: MessagesFilters): Observable<Message[]> {
    const messages = this.#generateMessages(filters);
    let filteredMessages = messages.filter((message) => {
      const subject = message.subject.toLowerCase();
      const sender = message.sender.toLowerCase();
      return (
        subject.includes(filters.query) ||
        sender.includes(filters.query)
      );
    });

    if (filters.order) {
      const direction = filters.order === 'asc' ? 1 : -1;
      filteredMessages = filteredMessages.sort((a, b) =>
        direction * (a.date.getTime() - b.date.getTime()));
    }
    return scheduled([filteredMessages], asyncScheduler);
  }

  #generateMessages(filters?: MessagesFilters | undefined): Message[] {
    const noOfMessages = faker.number.int({min: 20, max: 50});
    const messages = [];

    for (let i = 0; i <= noOfMessages; i += 1) {
      const id = faker.string.uuid();
      const sender = faker.person.fullName();
      const subject = faker.lorem.sentence();
      const content = faker.lorem.paragraphs({min: 1, max: 10});
      const date = faker.date.past();
      let hasAttachment = faker.datatype.boolean();

      if (filters && filters.hasAttachment !== undefined) {
        hasAttachment = filters.hasAttachment;
      }

      messages.push({
        id,
        sender,
        subject,
        content,
        date,
        hasAttachment,
      });
    }

    return messages;
  }
}
