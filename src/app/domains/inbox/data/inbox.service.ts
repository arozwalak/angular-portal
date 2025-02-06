import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Message } from './Message';
import { Observable, of } from 'rxjs';

@Injectable()
export default class InboxService {
  getMessages(): Observable<Message[]> {
    const noOfMessages = faker.number.int({ min: 3, max: 20 });
    const messages = [];
    for (let i = 0; i <= noOfMessages; i += 1) {
      messages.push(this.#generateMessage());
    }
    return of(messages);
  }

  #generateMessage(): Message {
    const id = faker.string.uuid();
    const name = faker.person.fullName();
    const subject = faker.lorem.sentence();
    const content = faker.lorem.paragraphs({ min: 1, max: 10 });
    const date = faker.date.past();
    const hasAttachment = faker.datatype.boolean();

    return {
      id,
      sender: name,
      subject,
      content,
      date,
      hasAttachment,
    };
  }
}
