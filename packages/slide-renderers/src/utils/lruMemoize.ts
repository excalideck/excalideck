import LRU from "lru-cache";

interface Options<Arguments extends any[], CacheKey> {
    maxSize: number;
    getCacheKey: (...args: Arguments) => CacheKey;
}
export default function lruMemoize<
    Arguments extends any[],
    ReturnValue,
    CacheKey
>(
    fn: (...args: Arguments) => ReturnValue,
    options: Options<Arguments, CacheKey>
): (...args: Arguments) => ReturnValue {
    const lru = new LRU<CacheKey, ReturnValue>({ max: options.maxSize });
    return (...args) => {
        const cacheKey = options.getCacheKey(...args);
        const cachedReturnValue = lru.get(cacheKey);
        if (cachedReturnValue !== undefined) {
            return cachedReturnValue;
        }
        const returnValue = fn(...args);
        lru.set(cacheKey, returnValue);
        return returnValue;
    };
}
