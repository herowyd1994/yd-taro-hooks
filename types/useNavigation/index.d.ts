import { Back } from './types';
declare const _default: <P extends Record<string, any>, R extends Record<string, any> = any>(routeNames?: R, defaultParams?: P, delay?: number) => {
    back: Back;
    replace: (key: keyof R, params?: Record<string, any>) => Promise<any>;
    push: (key: keyof R, params?: Record<string, any>) => Promise<any>;
    reLaunch: (key: keyof R, params?: Record<string, any>) => Promise<any>;
    switchTab: (key: keyof R, params?: Record<string, any>) => Promise<any>;
    path: string;
    params: P;
};
export default _default;
