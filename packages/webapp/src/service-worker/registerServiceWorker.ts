interface Callbacks {
    onFirstInstall?: () => void;
    onUpdateAvailable?: () => void;
}
export default function registerServiceWorker(
    scope: string,
    callbacks?: Callbacks
) {
    if (
        process.env["NODE_ENV"] === "production" &&
        "serviceWorker" in navigator
    ) {
        window.addEventListener("load", () => register(scope, callbacks));
    }
}

async function register(scope: string, callbacks?: Callbacks) {
    try {
        const registration = await navigator.serviceWorker.register(
            new URL("../serviceWorker.ts", import.meta.url),
            { type: "module", scope }
        );

        // updatefound is fired when a service worker tries to install
        registration.addEventListener("updatefound", () => {
            const installingWorker = registration.installing;
            installingWorker?.addEventListener("statechange", () => {
                if (installingWorker.state === "installed") {
                    if (navigator.serviceWorker.controller !== null) {
                        // If a service worker is already controlling the page,
                        // the newly installed service worker must be an update
                        callbacks?.onUpdateAvailable?.();
                    } else {
                        // Else, it must be the first install
                        callbacks?.onFirstInstall?.();
                    }
                }
            });
        });
    } catch (error) {
        console.error("Service worker registration failed");
        console.error(error);
    }
}
