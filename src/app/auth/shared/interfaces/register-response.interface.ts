import { User } from 'src/app/shared/interfaces';

export interface RegisterResponse {
  token: string;
  user: User;
}
