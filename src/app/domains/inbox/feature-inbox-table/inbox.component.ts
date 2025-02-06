import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FiltersComponent } from '../../shared/ui-common/filters/filters.component';
import {
  faChevronDown,
  faChevronRight,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import InboxService from '../data/inbox.service';
import { DatePipe } from '@angular/common';
import { Filters } from '../../shared/ui-common/filters/Filters';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inbox',
  imports: [FontAwesomeModule, FiltersComponent, DatePipe],
  providers: [InboxService],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss',
})
export class InboxComponent {
  name!: string;
  faPaperclip = faPaperclip;
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;

  inboxService = inject(InboxService);

  messages = toSignal(this.inboxService.getMessages());
  filteredMessages = computed(() => this.messages());

  onFiltersChange(filters: Filters) {
    if (filters) {
      this.filteredMessages = computed(() => {
        const messages = this.messages();
        let filteredMessages = messages;

        if (filters.criteria) {
          const criteria = filters.criteria.toLowerCase();

          filteredMessages = filteredMessages?.filter((message) => {
            const content = message.content.toLowerCase();
            const subject = message.subject.toLowerCase();
            const sender = message.sender.toLowerCase();
            return (
              content.includes(criteria) ||
              subject.includes(criteria) ||
              sender.includes(criteria)
            );
          });
        }

        if (filters.hasAttachment !== undefined) {
          filteredMessages = filteredMessages?.filter(
            (message) => filters.hasAttachment === message.hasAttachment
          );
        }

        if (filters.date) {
          filteredMessages = filteredMessages?.filter((message) => {
            const msgDate = new NgbDate(
              message.date.getUTCFullYear(),
              message.date.getUTCMonth() + 1,
              message.date.getUTCDate()
            );

            return msgDate.equals(filters.date);
          });
        }

        return filteredMessages;
      });
    }
  }
}
