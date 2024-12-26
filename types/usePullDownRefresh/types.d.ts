import { Config } from '../useCache/types';
export interface Props<D> extends Omit<Config, 'formatData'> {
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
export declare enum Status {
    None = 0,
    Refreshing = 1,
    Pulling = 2
}
