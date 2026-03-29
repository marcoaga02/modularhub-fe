import {Gender} from 'app/modules/user-management/model/gender';
import {Language} from 'app/modules/user-management/model/language';
import {Group} from 'app/modules/user-management/model/group';
import {UUID} from 'app/shared/types/uuid';

export interface User {
  id?: UUID,
  firstname: string,
  lastname: string,
  gender: Gender,
  language: Language,
  mobileNumber?: string,
  taxIdNumber: string,

  email: string,
  username: string,
  groups: Group[],
  enabled: boolean,
}

export interface UserRequest {
  firstname: string,
  lastname: string,
  gender: Gender,
  languageId: string,
  mobileNumber?: string,
  taxIdNumber: string,

  email: string,
  username: string,
  password: string,
  groupIds: number[],
  enabled: boolean,
}
