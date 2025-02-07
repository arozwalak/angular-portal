import {Component, input} from '@angular/core';
import {
  faChevronDown,
  faChevronRight,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {Message} from "@api/models/Message";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-ui-messages-list',
  imports: [FontAwesomeModule, DatePipe],
  templateUrl: './ui-messages-list.component.html',
  styleUrl: './ui-messages-list.component.scss'
})
export class UiMessagesListComponent {
  faPaperclip = faPaperclip;
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;

  messages = input.required<Message[]>();
  isLoading = input.required<boolean>();
}
