const { join } = require("path");

const GITHUB_REF = process.env.GITHUB_REF;
const BUNDLE_TAG = GITHUB_REF.startsWith("refs/pull/")
    ? `PR/${GITHUB_REF.split("/")[2]}`
    : GITHUB_REF.startsWith("refs/heads/")
    ? `BRANCH/${GITHUB_REF.replace(/^refs\/heads\//, "")}`
    : GITHUB_REF.startsWith("refs/tags/")
    ? `TAG/${GITHUB_REF.replace(/^refs\/tags\//, "")}`
    : "UNKNOWN";
const COMMIT_SHA = process.env.GITHUB_SHA;
const IS_MASTER = BUNDLE_TAG === "BRANCH/master";
const IS_HOMEPAGE = process.env.IS_HOMEPAGE === "true";

module.exports = {
    bundle: {
        from: join(__dirname, "/build"),
        name: "excalideck.com",
        tag: BUNDLE_TAG,
        description: `Commit ${COMMIT_SHA}`,
        fallbackAssetPath: "/index.html",
        fallbackStatusCode: 200,
        headers: {
            "**/*": {
                "Cache-Control": "public, max-age=86400",
            },
        },
    },
    deploy: {
        app: IS_MASTER ? "excalideck.com" : "preview.excalideck.com",
        entrypoint: IS_MASTER
            ? IS_HOMEPAGE
                ? "excalideck.com/"
                : "app.excalideck.com/"
            : `preview.excalideck.com/${BUNDLE_TAG}/`,
        bundle: `excalideck.com:${BUNDLE_TAG}`,
    },
};
