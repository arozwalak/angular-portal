import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface Filters {
  criteria?: string | undefined;
  hasAttachment?: boolean | undefined;
  date?: NgbDateStruct | undefined;
}
