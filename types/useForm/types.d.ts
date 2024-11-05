import { Values } from '@yd/r-hooks/types/useVerify/types';
export interface Props<S> {
    store: S;
    submitUrl?: string;
    updateUrl?: string;
    delay?: number;
    toast?: boolean;
    back?: boolean;
    formatParams?(params: Record<string, any> & Values<S>): Promise<Record<string, any>> | Record<string, any>;
    done?(data: any): any;
}
export type Handler = <D>(params?: Record<string, any>) => Promise<Promise<D>>;
