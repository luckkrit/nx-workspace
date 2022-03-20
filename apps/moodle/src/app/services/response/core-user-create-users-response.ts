import {User} from "../model/user";

export interface CoreUserCreateUsersResponse {
  users: Array<Partial<User>>
}
