export interface UserDetail {
  sitename: string;
  username: string;
  firstname: string;
  lastname: string;
  fullname: string;
  lang: string;
  userid: number;
  siteurl: string;
  userpictureurl: string;
  functions: RootObjectFunctions[];
  downloadfiles: number;
  uploadfiles: number;
  release: string;
  version: string;
  mobilecssurl: string;
  advancedfeatures: RootObjectAdvancedfeatures[];
  usercanmanageownfiles: boolean;
  userquota: number;
  usermaxuploadfilesize: number;
  userhomepage: number;
  userprivateaccesskey: string;
  siteid: number;
  sitecalendartype: string;
  usercalendartype: string;
  userissiteadmin: boolean;
  theme: string;
}

export interface RootObjectFunctions {
  name: string;
  version: string;
}

export interface RootObjectAdvancedfeatures {
  name: string;
  value: number;
}
