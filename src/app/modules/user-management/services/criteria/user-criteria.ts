import {PagedCriteria} from 'app/shared/filters/criteria';

export enum UserSortField {
  Firstname = "firstname",
  Lastname = "lastname",
  Email = "email",
}

type UserFilter = {
  text?: string;
  nodeId?: number;
}

export class UserCriteria extends PagedCriteria {
  override filter: UserFilter;

  constructor(offset: number = 0, limit: number = 0, filter: UserFilter = {}, sort: string = UserSortField.Lastname) {
    super(offset, limit, sort);
    this.filter = filter;
  }

}
