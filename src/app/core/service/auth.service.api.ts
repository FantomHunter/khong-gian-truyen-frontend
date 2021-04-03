import { Observable } from 'rxjs';
import { Credential, User } from '../model/user.model';

export abstract class AuthenticationServiceApi {
  abstract login(credential: Credential): Observable<User>;
}
