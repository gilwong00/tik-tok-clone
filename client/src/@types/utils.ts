import { UseQueryOptions } from 'react-query';

export type PromiseValue<T> = T extends PromiseLike<infer Value>
  ? PromiseValue<Value>
  : T;

export type QueryConfig<FetcherFnType extends (...args: any) => any> =
  UseQueryOptions<PromiseValue<ReturnType<FetcherFnType>>>;
