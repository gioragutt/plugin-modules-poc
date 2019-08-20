import { CanLoad, SubmoduleProcessor } from '../interfaces';

export function isFunction<T>(v: any): v is T {
  return typeof v === 'function';
}

export function isCanLoad(guard: any): guard is CanLoad {
  return guard && isFunction<CanLoad>(guard.canLoad);
}

export function isSubmoduleProcessor(value: any): value is SubmoduleProcessor {
  return value && isFunction<SubmoduleProcessor>(value.process);
}
