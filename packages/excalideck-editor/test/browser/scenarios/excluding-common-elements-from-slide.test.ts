import { test } from "@playwright/test";
import ExcalideckEditorPage from "../ExcalideckEditorPage";

test("Exclude common elements from a slide", async ({ page }) => {
    const excalideckEditorPage = new ExcalideckEditorPage(page);
    await excalideckEditorPage.go();
    await excalideckEditorPage.addSlide();
    await excalideckEditorPage.goToSettings();
    await excalideckEditorPage.drawRectangle();
    await excalideckEditorPage.goToSlides();
    await excalideckEditorPage.selectSlide(1);
    await excalideckEditorPage.excludeCommonElementsForSlide();
    await excalideckEditorPage.expectToSee(
        "two slide miniatures",
        "a rectangle (common element) in the first miniature",
        "no rectangle (common element) in the second slide",
        "no rectangle (common element) in the drawing area"
    );
});
