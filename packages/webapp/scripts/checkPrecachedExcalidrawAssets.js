const { readdirSync } = require("fs");
const { dirname, join } = require("path");
const { isEqual } = require("lodash");

const excalidrawPackageDir = dirname(
    require.resolve("@excalidraw/excalidraw/package.json")
);
const excalidrawAssetsDir = join(
    excalidrawPackageDir,
    "dist/excalidraw-assets/"
);

const excalidrawAssets = readdirSync(excalidrawAssetsDir);

const precachableExcalidrawAssets = excalidrawAssets.filter(
    (excalidrawAsset) =>
        (excalidrawAsset.endsWith(".js") ||
            excalidrawAsset.endsWith(".woff2")) &&
        !excalidrawAsset.startsWith("i18n")
);

const precachedExcalidrawAssets = require("../src/service-worker/precachedExcalidrawAssets.json");

if (
    !isEqual(
        precachableExcalidrawAssets.sort(),
        precachedExcalidrawAssets.sort()
    )
) {
    console.error(
        "src/service-worker/precachedExcalidrawAssets.json is outdated"
    );
    process.exit(1);
}
