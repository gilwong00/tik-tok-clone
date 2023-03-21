type ErrorResponse<E> = null | E;

export const promiseHandler = async <T, E>(
  prom: Promise<T>
): Promise<[Awaited<T | null>, ErrorResponse<E>]> => {
  try {
    return [await prom, null];
  } catch (error) {
    return [null, error as E];
  }
};
