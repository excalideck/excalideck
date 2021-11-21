import { test } from "@playwright/test";
import ExcalideckEditorPage from "../ExcalideckEditorPage";

test("Delete a slide", async ({ page }) => {
    const excalideckEditorPage = new ExcalideckEditorPage(page);
    await excalideckEditorPage.go();
    await excalideckEditorPage.drawRectangle();
    await excalideckEditorPage.addSlide();
    await excalideckEditorPage.drawEllipse();
    await excalideckEditorPage.addSlide();
    await excalideckEditorPage.drawDiamond();
    await excalideckEditorPage.selectSlide(1);
    await excalideckEditorPage.deleteSlide();
    await excalideckEditorPage.expectToSee(
        "two slide miniatures",
        "the first slide miniature has a rectangle",
        "the second slide miniature has a diamond",
        "a rectangle in the drawing area"
    );
});
