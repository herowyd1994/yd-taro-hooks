/** @format */

export interface Props<D> {
    requestUrl: string;
    immediate?: boolean;
    formatParams?(params: Params): Promise<Params> | Params;
    formatData?(data: any): Promise<D[]> | D[];
}
interface Params extends Record<string, any> {
    pageSize: number;
    pageNum: number;
}
export interface Store<D> {
    status: Status;
    noMore: boolean;
    pageSize: number;
    pageNum: number;
    data: D[];
}
export enum Status {
    None,
    Refreshing,
    Pulling
}
