/**
 * Returns a promise which resolves when the passed-in html element hasn't
 * changed for at least `options.stableFor` milliseconds. If this doesn't happen
 * within `options.timeout` milliseconds, the promise is rejected. This function
 * is supposed to be run as a `JSHandle.evaluate` page function.
 */
export default function waitUntilStable(
    element: HTMLElement,
    options: { stableFor: number; timeout: number }
) {
    return new Promise<void>((resolve, reject) => {
        let timeoutTimeout: number;
        function startTimeoutTimeout() {
            timeoutTimeout = window.setTimeout(onTimeout, options.timeout);
        }
        function stopTimeoutTimeout() {
            window.clearTimeout(timeoutTimeout);
        }

        let stabilityTimeout: number;
        function startStabilityTimeout() {
            stabilityTimeout = window.setTimeout(onStable, options.stableFor);
        }
        function stopStabilityTimeout() {
            window.clearTimeout(stabilityTimeout);
        }
        function restartStabilityTimeout() {
            stopStabilityTimeout();
            startStabilityTimeout();
        }

        const mutationObserver = new window.MutationObserver(
            restartStabilityTimeout
        );

        function onStable() {
            stopTimeoutTimeout();
            mutationObserver.disconnect();
            resolve();
        }

        function onTimeout() {
            stopStabilityTimeout();
            mutationObserver.disconnect();
            reject(
                new Error(
                    "waitUntilStable: timed-out while waiting for html element to be stable"
                )
            );
        }

        mutationObserver.observe(element, {
            subtree: true,
            childList: true,
        });
        startTimeoutTimeout();
        startStabilityTimeout();
    });
}
