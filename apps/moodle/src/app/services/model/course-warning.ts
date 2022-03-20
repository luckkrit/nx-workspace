import {Course} from "./course";
import {Warning} from "./warning";

export interface CourseWarning {
  courses: Course[];
  warnings: Warning[];
}
