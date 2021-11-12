const { cpSync, mkdirSync } = require("fs");
const { dirname, join } = require("path");

const excalidrawPackageDir = dirname(
    require.resolve("@excalidraw/excalidraw/package.json")
);
const excalidrawAssetsDir = join(
    excalidrawPackageDir,
    "dist/excalidraw-assets/"
);

mkdirSync(join(__dirname, "../build/assets/"), { recursive: true });
cpSync(
    excalidrawAssetsDir,
    join(__dirname, "../build/assets/excalidraw-assets/"),
    {
        recursive: true,
    }
);
