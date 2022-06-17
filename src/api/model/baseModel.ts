export interface BasicPageParams {
  pageNo: number;
  pageSize: number;
}

export interface BasicFetchResult<T> {
  records: T[];
  total: number;
}
