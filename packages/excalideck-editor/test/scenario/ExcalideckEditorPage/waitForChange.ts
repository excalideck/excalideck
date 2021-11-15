/**
 * Returns a promise which resolves when the passed-in html element changes. If
 * this doesn't happen within `options.timeout` milliseconds, the promise is
 * rejected. This function is supposed to be run as a `JSHandle.evaluate` page
 * function.
 */
export default function waitForChange(
    element: HTMLElement,
    options: { timeout: number }
) {
    return new Promise<void>((resolve, reject) => {
        let timeoutTimeout: number;
        function startTimeoutTimeout() {
            timeoutTimeout = window.setTimeout(onTimeout, options.timeout);
        }
        function stopTimeoutTimeout() {
            window.clearTimeout(timeoutTimeout);
        }

        const mutationObserver = new window.MutationObserver(onChange);

        function onTimeout() {
            reject(
                new Error(
                    "waitForChange: timed-out while waiting for html element to change"
                )
            );
            mutationObserver.disconnect();
        }

        function onChange() {
            stopTimeoutTimeout();
            mutationObserver.disconnect();
            resolve();
        }

        mutationObserver.observe(element, {
            subtree: true,
            childList: true,
        });
        startTimeoutTimeout();
    });
}
