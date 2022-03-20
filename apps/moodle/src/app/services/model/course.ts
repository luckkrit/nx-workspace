export interface Course {
  id: number;
  fullname: string;
  displayname: string;
  shortname: string;
  categoryid: number;
  categoryname: string;
  sortorder: number;
  summary: string;
  summaryformat: number;
  summaryfiles: any[];
  overviewfiles: any[];
  showactivitydates: boolean;
  showcompletionconditions: boolean;
  contacts: any[];
  enrollmentmethods: string[];
}
