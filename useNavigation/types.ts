/** @format */

export type MethodKeys = 'push' | 'replace' | 'reLaunch' | 'switchTab';
export type MethodFn<K> = (key: K, params?: Record<string, any>) => Promise<any>;
export type Back = (delta?: number, time?: number) => Promise<any>;
