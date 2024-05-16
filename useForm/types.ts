/** @format */

import { Values } from '@yd/r-hooks/useVerify/types';

export interface Props<S> {
    store: S;
    submitUrl?: string;
    updateUrl?: string;
    delay?: number;
    back?: boolean;
    formatParams?(params: Params<S>): Promise<Params<S>> | Params<S>;
    done?(data: any): void;
}
type Params<S> = Record<string, any> & Values<S>;
export type Handler = <D>(params?: Record<string, any>) => Promise<Promise<D>>;
