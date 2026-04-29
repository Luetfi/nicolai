export interface TheoryLesson {
  id: string;
  date: string;        // YYYY-MM-DD
  startTime: string;   // HH:MM
  endTime: string;     // HH:MM
  locationId: string;  // matches Location.id from contact.ts
  topic?: string;
  notes?: string;
}

export interface TheoryScheduleFile {
  _updated: string;
  items: TheoryLesson[];
}
