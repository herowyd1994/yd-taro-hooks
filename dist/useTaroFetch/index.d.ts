import { Config } from '@yd/fetch/dist/types';
export { useFetch } from '@yd/fetch';
export declare const createFetch: ({ onHeader, onLogout, onError, transformRequestBody, ...config }: Config) => (({ method, url, ...opts }: {
    [x: string]: any;
    method: any;
    url: any;
}) => any) & import("@yd/fetch/dist/lib/request").Request;
