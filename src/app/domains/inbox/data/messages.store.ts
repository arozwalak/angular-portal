import {Message} from "@api/models/Message";
import {patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {computed, inject, InjectionToken, Signal} from "@angular/core";
import MessagesService from "@app/inbox/data/messages.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {debounceTime, distinctUntilChanged, pipe, switchMap, tap} from "rxjs";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {tapResponse} from '@ngrx/operators';
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

type MessagesState = {
  messages: Message[];
  isLoading: boolean;
  filters: MessagesFilters;
};

export type MessagesFilters = {
  query: string,
  hasAttachment: boolean | undefined;
  date: NgbDateStruct | undefined;
  order: 'asc' | 'desc'
};

const initialState: MessagesState = {
  messages: [],
  isLoading: false,
  filters: {
    query: '',
    hasAttachment: undefined,
    date: undefined,
    order: 'asc'
  }
};

const MESSAGES_STATE = new InjectionToken<MessagesState>('MessagesState', {
  factory: () => initialState,
});

export const MessagesStore = signalStore(
  withState(() => inject(MESSAGES_STATE)),
  withComputed(({messages, filters}) => ({
    messagesCount: computed(() => messages().length),
  })),
  withMethods((store, messagesService = inject(MessagesService)) => ({
    loadAll(): void {
      patchState(store, {isLoading: true});

      const messages = toSignal(messagesService.getMessages());
      patchState(store, {messages: messages(), isLoading: false});
    },
    loadByFilters: rxMethod<MessagesFilters>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, {isLoading: true})),
        switchMap((filters) => {
          return messagesService.getMessagesByQuery(filters).pipe(
            tapResponse({
              next: (messages) => patchState(store, {messages}),
              error: console.error,
              finalize: () => patchState(store, {isLoading: false})
            })
          )
        })
      )
    ),
    updateHasAttachment(hasAttachment: boolean | undefined): void {
      patchState(store, (state) => ({filters: {...state.filters, hasAttachment}}));
    },
    updateQuery(query: string): void {
      patchState(store, (state) => ({filters: {...state.filters, query}}));
    },
    updateDate(date: NgbDateStruct | undefined): void {
      patchState(store, (state) => ({filters: {...state.filters, date}}));
    },
    updateOrder(order: 'asc' | 'desc'): void {
      patchState(store, (state) => ({filters: {...state.filters, order}}));
    }
  }))
);

