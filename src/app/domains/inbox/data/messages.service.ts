import {inject, Injectable, Signal} from '@angular/core';
import { Message } from '@api/models/Message';
import { Observable } from 'rxjs';
import {MessagesApi} from "@api/MessagesApi";
import {MessagesFilters} from "@app/inbox/data/messages.store";

@Injectable()
export default class MessagesService {
  readonly #messagesApi = inject(MessagesApi);

  getMessages(): Observable<Message[]> {
    return this.#messagesApi.getMessages();
  }
  getMessagesByQuery(filters: MessagesFilters): Observable<Message[]> {
    return this.#messagesApi.getMessagesByQuery(filters);
  }
}
