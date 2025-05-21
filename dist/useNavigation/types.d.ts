export type Methods<K> = Record<'push' | 'replace' | 'reLaunch' | 'switchTab', (key: K, params?: Record<string, any>) => Promise<any>>;
export type Back = (delta?: number, time?: number) => Promise<Promise<any>>;
