import { CanLoad, PluginProcessor } from '../interfaces';

export function isFunction<T>(v: any): v is T {
  return typeof v === 'function';
}

export function isCanLoad(guard: any): guard is CanLoad {
  return guard && isFunction<CanLoad>(guard.canLoad);
}

export function isPluginProcessor(value: any): value is PluginProcessor {
  return value && isFunction<PluginProcessor>(value.process);
}
