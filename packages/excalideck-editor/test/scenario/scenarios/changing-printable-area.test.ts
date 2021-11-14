import { test } from "@playwright/test";
import ExcalideckEditorPage from "../ExcalideckEditorPage";

test("Change the printable area", async ({ page }) => {
    const excalideckEditorPage = new ExcalideckEditorPage(page);
    await excalideckEditorPage.go();
    await excalideckEditorPage.goToSettings();
    await excalideckEditorPage.changePrintableArea(1000, 1000);
    await excalideckEditorPage.goToSlides();
    await excalideckEditorPage.expectToSee("a square printable area");
});
