export interface Message {
  id: string;
  sender: string;
  subject: string;
  content: string;
  date: Date;
  hasAttachment: boolean;
}
