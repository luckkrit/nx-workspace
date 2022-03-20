import {CoreCourseGetCoursesByFieldRequest} from './core-course-get-coures-by-field-request';
import {GetCourseFieldType} from "../model/get-course-by-field-dto";

describe('CoreCourseGetCoursesByFieldRequest', () => {
  it('should create an instance', () => {
    expect(new CoreCourseGetCoursesByFieldRequest({
      token: "",
      field: {type: GetCourseFieldType.CATEGORY, value: ""}
    })).toBeTruthy();
  });
});
