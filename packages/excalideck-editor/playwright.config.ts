import { PlaywrightTestConfig } from "@playwright/test";
import { compact } from "lodash";
import { platform } from "os";

const IS_CI = process.env["CI"] === "true";

const config: PlaywrightTestConfig = {
    testDir: "test/browser",
    forbidOnly: IS_CI,
    retries: IS_CI ? 2 : 0,
    webServer: {
        command:
            "yarn parcel test/browser/ExcalideckEditorPage/index.html --no-cache --no-hmr --no-autoinstall",
        port: 1234,
        env: {
            EXCALIDRAW_ELEMENTS_INPUT_ONCHANGE_CHECK_INTERVAL: "1",
            SLIDE_MINIATURES_DROP_TRANSITION_DURATION: "0",
            SORTABLE_SLIDE_MINIATURE_MOVE_TRANSITION_DURATION: "0",
            SLIDE_MINIATURE_IMAGE_RENDER_DEBOUNCE: "1",
        },
    },
    use: {
        trace: "retain-on-failure",
    },
    reporter: IS_CI ? [["github"], ["list"]] : "list",
    projects: compact([
        {
            name: "chromium",
            use: { browserName: "chromium" },
        },
        {
            name: "firefox",
            use: { browserName: "firefox" },
        },
        // Re-enable when @playwright/test v1.17.0 is released. See
        // microsoft/playwright issue #9811
        platform() !== "darwin"
            ? {
                  name: "webkit",
                  use: { browserName: "webkit" },
              }
            : null,
    ]),
};
export default config;
