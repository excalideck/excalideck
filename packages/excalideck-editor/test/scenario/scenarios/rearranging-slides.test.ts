import { test } from "@playwright/test";
import ExcalideckEditorPage from "../ExcalideckEditorPage";

test("Drag and drop slides to rearrange them", async ({ page }) => {
    const excalideckEditorPage = new ExcalideckEditorPage(page);
    await excalideckEditorPage.go();
    await excalideckEditorPage.drawRectangle();
    await excalideckEditorPage.addSlide();
    await excalideckEditorPage.drawEllipse();
    await excalideckEditorPage.addSlide();
    await excalideckEditorPage.drawDiamond();
    await excalideckEditorPage.moveSlide(2, 0);
    await excalideckEditorPage.expectToSee(
        "three slide miniatures",
        "the first slide miniature has a diamond",
        "the second slide miniature has a rectangle",
        "the third slide miniature has an ellipse",
        "a diamond in the drawing area"
    );
});
