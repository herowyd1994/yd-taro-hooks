import { RequestConfig } from '@yd/fetch/types/types';
export interface Props<S> extends Config {
    store: S;
    submitUrl?: string;
    updateUrl?: string;
    delay?: number;
    toast?: boolean;
    back?: boolean;
    done?(data: any): any;
}
export type Handler = <D>(params?: Record<string, any>, config?: Config) => Promise<Promise<D>>;
export type Config = Partial<Omit<RequestConfig, 'toast'>>;
