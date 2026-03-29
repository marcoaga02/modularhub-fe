import {UUID} from 'app/shared/types/uuid';

export interface Language {
  id: UUID,
  code: string,
  label: string,
  isDefault: boolean,
}
