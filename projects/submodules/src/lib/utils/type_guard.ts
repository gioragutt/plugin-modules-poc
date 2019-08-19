import { CanActivate, SubmoduleProcessor } from '../interfaces';

export function isFunction<T>(v: any): v is T {
  return typeof v === 'function';
}

export function isCanActivate(guard: any): guard is CanActivate {
  return guard && isFunction<CanActivate>(guard.canActivate);
}

export function isSubmoduleProcessor(value: any): value is SubmoduleProcessor {
  return value && isFunction<SubmoduleProcessor>(value.process);
}
