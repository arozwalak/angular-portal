import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface MessageFilters {
  from?: string | undefined;
  subject?: string | undefined;
  content?: string | undefined;
  hasAttachment?: boolean | undefined;
  fromDate?: NgbDateStruct | undefined;
  toDate?: NgbDateStruct | undefined;
}
