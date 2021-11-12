// Note: this file needs to stay in the src directory, at the same level of
// index.html, so that it gets served from the same path-level of index.html,
// and hence that path-level is used as the scope of the service worker
import { manifest, version } from "@parcel/service-worker";
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import precachedExcalidrawAssets from "./service-worker/precachedExcalidrawAssets.json";

precacheAndRoute(
    [
        ...manifest,
        // Excalidraw assets are not included in the parcel manifest, as they
        // are copied to the build directory after parcel has built the app. We
        // therefore need to add them separately
        ...precachedExcalidrawAssets.map(
            (precachedExcalidrawAsset) =>
                `assets/excalidraw-assets/${precachedExcalidrawAsset}`
        ),
    ].map(addRevision)
);
cleanupOutdatedCaches();

function addRevision(url: string) {
    return { url, revision: version };
}
