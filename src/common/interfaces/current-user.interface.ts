import { UserRole } from '../enums/user-role.enum';

export interface CurrentUserData {
  id: string;

  phone: string;

  name: string | null;

  role: UserRole;

  academicLevelId: string | null;
}