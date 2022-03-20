export interface GetCourseByFieldDto {
  token: string,
  field: GetCourseField
}

export interface GetCourseField {
  type: GetCourseFieldType,
  value: number | string
}

export enum GetCourseFieldType {
  ID = "id",
  IDS = "ids",
  SHORTNAME = "shortname",
  IDNUMBER = "idnumber",
  CATEGORY = "category"
}
