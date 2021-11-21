import { test } from "@playwright/test";
import ExcalideckEditorPage from "../ExcalideckEditorPage";

test("Draw common elements", async ({ page }) => {
    const excalideckEditorPage = new ExcalideckEditorPage(page);
    await excalideckEditorPage.go();
    await excalideckEditorPage.addSlide();
    await excalideckEditorPage.goToSettings();
    await excalideckEditorPage.drawRectangle();
    await excalideckEditorPage.goToSlides();
    await excalideckEditorPage.expectToSee(
        "a rectangle (common element) in the middle of the drawing area",
        "two slide miniatures",
        'the rectangle "reflected" in each slide miniature'
    );
});
