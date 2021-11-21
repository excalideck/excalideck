import { test } from "@playwright/test";
import ExcalideckEditorPage from "../ExcalideckEditorPage";

test("Draw a simple shape in a single slide", async ({ page }) => {
    const excalideckEditorPage = new ExcalideckEditorPage(page);
    await excalideckEditorPage.go();
    await excalideckEditorPage.drawRectangle();
    await excalideckEditorPage.expectToSee(
        "a rectangle in the drawing area",
        'the corresponding rectangle "reflected" in the slide miniature'
    );
});
