import { OverviewFile } from './overview-file';

export interface UserCourse {
  id: number;
  shortname: string;
  fullname: string;
  displayname: string;
  enrolledusercount: number;
  idnumber: string;
  visible: number;
  summary: string;
  summaryformat: number;
  format: string;
  showgrades: boolean;
  lang: string;
  enablecompletion: boolean;
  completionhascriteria: boolean;
  completionusertracked: boolean;
  category: number;
  progress: number | null;
  completed: boolean;
  startdate: number;
  enddate: number;
  marker: number;
  lastaccess: number | null;
  isfavourite: boolean;
  hidden: boolean;
  overviewfiles: OverviewFile[];
  showactivitydates: boolean;
  showcompletionconditions: boolean;
}
