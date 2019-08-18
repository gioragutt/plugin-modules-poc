import { Observable } from 'rxjs';

export interface CanActivate {
  canActivate(): boolean | Promise<boolean> | Observable<boolean>;
}
