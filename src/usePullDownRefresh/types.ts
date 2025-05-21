/** @format */

import { MethodFnConfig } from '@yd/fetch/dist/types';

export interface Props<D> extends Omit<MethodFnConfig, 'formatData'> {
    immediate?: boolean;
    pageSize?: number;
    requestUrl: string;
    params?: Record<string, any>;
    formatData?(data: any): Promise<D[]> | D[];
}
export interface Store<D> {
    status: Status;
    noMore: boolean;
    pageNum: number;
    data: D[];
}
export enum Status {
    None,
    Refreshing,
    Pulling
}
