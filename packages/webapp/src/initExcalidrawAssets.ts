export default function initExcalidrawAssets() {
    if (process.env["NODE_ENV"] === "production") {
        (window as any).EXCALIDRAW_ASSET_PATH = "./assets/";
        preloadFont("./assets/excalidraw-assets/Virgil.woff2");
        preloadFont("./assets/excalidraw-assets/Cascadia.woff2");
    } else {
        preloadFont(
            "https://unpkg.com/@excalidraw/excalidraw@0.10.0/dist/excalidraw-assets-dev/Virgil.woff2"
        );
        preloadFont(
            "https://unpkg.com/@excalidraw/excalidraw@0.10.0/dist/excalidraw-assets-dev/Cascadia.woff2"
        );
    }
}

const INIT_EXCALIDRAW_ASSETS_SCRIPT_ID = "init-excalidraw-assets";

function preloadFont(fontUrl: string) {
    const link = document.createElement("link");
    link.setAttribute("rel", "preload");
    link.setAttribute("type", "font/woff2");
    link.setAttribute("href", fontUrl);
    link.setAttribute("as", "font");
    link.setAttribute("crossorigin", "anonymous");
    document.head.insertBefore(
        link,
        document.getElementById(INIT_EXCALIDRAW_ASSETS_SCRIPT_ID)!.nextSibling
    );
}
