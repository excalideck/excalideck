if (process.env["NODE_ENV"] === "production") {
    preloadFont("./excalidraw-assets/Virgil.woff2");
    preloadFont("./excalidraw-assets/Cascadia.woff2");
    (window as any).EXCALIDRAW_ASSET_PATH = "./";
}

function preloadFont(fontUrl: string) {
    const link = document.createElement("link");
    link.setAttribute("rel", "preload");
    link.setAttribute("type", "font/woff2");
    link.setAttribute("href", fontUrl);
    link.setAttribute("as", "font");
    link.setAttribute("crossorigin", "anonymous");
    document.head.insertBefore(
        link,
        document.getElementById("init-prod-assets")!.nextSibling
    );
}

export {};
