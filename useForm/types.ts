/** @format */

import { Values } from '@yd/r-hooks/useVerify/types';

export interface Props<S> {
    store: S;
    submitUrl?: string;
    updateUrl?: string;
    delay?: number;
    back?: boolean;
    formatParams?(params: Params<S>): Params<S>;
}
type Params<S> = Record<string, any> & Values<S>;
export type Handler = (params?: Record<string, any>) => Params<any>;
