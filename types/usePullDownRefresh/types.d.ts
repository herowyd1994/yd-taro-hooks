export interface Props<D> {
    immediate?: boolean;
    pageSize?: number;
    requestUrl: string;
    params?: Record<string, any>;
    formatParams?(params: {
        pageSize: number;
        pageNum: number;
    } & Record<string, any>): Promise<Record<string, any>> | Record<string, any>;
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
