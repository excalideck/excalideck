import lruMemoize from "../../../src/utils/lruMemoize";

describe("lruMemoize", () => {
    it("memoizes the given function", () => {
        // Setup SUT
        const original = jest.fn((n: number) => n);
        const memoized = lruMemoize(original, {
            maxSize: 10,
            getCacheKey: (n) => n,
        });

        // Exercise
        // Miss
        memoized(0);
        // Hit
        memoized(0);
        // Hit
        memoized(0);

        // Verify
        expect(original).toHaveBeenCalledTimes(1);
    });

    it("uses the cache key returned by options.getCacheKey", () => {
        // Setup SUT
        const original = jest.fn((n: number) => n);
        const memoized = lruMemoize(original, {
            maxSize: 10,
            getCacheKey: (n) => n % 2,
        });

        // Exercise
        // Miss
        memoized(0);
        // Hit
        memoized(0);
        // Hit
        memoized(2);

        // Verify
        expect(original).toHaveBeenCalledTimes(1);
    });

    it("doesn't store more than options.maxSize items in its memoization cache", () => {
        // Setup SUT
        const original = jest.fn((n: number) => n);
        const memoized = lruMemoize(original, {
            maxSize: 2,
            getCacheKey: (n) => n,
        });

        // Exercise
        // Miss
        memoized(0);
        // Hit
        memoized(0);
        // Miss
        memoized(1);
        // Hit
        memoized(1);
        // Miss. This call should remove the `0` cache item
        memoized(2);
        // Hit
        memoized(2);
        // Miss
        memoized(0);

        // Verify
        expect(original).toHaveBeenCalledTimes(4);
    });
});
