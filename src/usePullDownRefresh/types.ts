/** @format */

import { Config } from '../useGet/types';

export interface Props<D> extends Omit<Config, 'formatData'> {
    pageSize?: number;
    requestUrl: string;
    params?: Record<string, any>;
    formatData?(data: any): Promise<D[]> | D[];
}
export interface Response<D> {
    list: D[];
    total: number;
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
