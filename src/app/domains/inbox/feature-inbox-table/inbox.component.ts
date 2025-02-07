import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import { FiltersComponent } from '@app/shared/ui-common/filters/filters.component';
import MessagesService from '@app/inbox/data/messages.service';
import {MessagesApi} from "@api/MessagesApi";
import {MessagesStore} from "@app/inbox/data/messages.store";
import {UiMessagesListComponent} from "@app/inbox/ui-messages-list/ui-messages-list.component";

@Component({
  selector: 'app-inbox',
  imports: [FiltersComponent, UiMessagesListComponent],
  providers: [MessagesService, MessagesApi, MessagesStore],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxComponent implements OnInit {
  readonly store = inject(MessagesStore);

  ngOnInit() {
    const filters = this.store.filters;
    this.store.loadByFilters(filters);
  }
}
