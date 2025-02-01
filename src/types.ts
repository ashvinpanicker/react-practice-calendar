export interface CalendarItem {
  day: number;
  category?: string;
  title?: string;
  path?: string;
  isBreak?: boolean;
  isContinue?: boolean;
  isCelebrate?: boolean;
}

export interface CalendarWeek {
  items: CalendarItem[];
}