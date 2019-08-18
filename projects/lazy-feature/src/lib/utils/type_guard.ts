import { CanActivate } from '../interfaces';

export function isFunction<T>(v: any): v is T {
  return typeof v === 'function';
}

export function isCanActivate(guard: any): guard is CanActivate {
  return guard && isFunction<CanActivate>(guard.canActivate);
}
