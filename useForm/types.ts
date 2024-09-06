/** @format */

import { Values } from '@yd/r-hooks/useVerify/types';

export interface Props<S> {
    store: S;
    submitUrl?: string;
    updateUrl?: string;
    delay?: number;
    back?: boolean;
    formatParams?(params: Record<string, any> & Values<S>): Promise<Record<string, any>> | Record<string, any>;
    done?<D>(data: D): any;
}
export type Handler = <D>(params?: Record<string, any>) => Promise<Promise<D>>;
