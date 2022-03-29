import { ContactUser } from './contact-user';
import { OverviewFile } from './overview-file';
import { SummaryFile } from './summary-file';

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
  summaryfiles: SummaryFile[];
  overviewfiles: OverviewFile[];
  showactivitydates: boolean;
  showcompletionconditions: boolean;
  contacts: ContactUser[];
  enrollmentmethods: string[];
}
