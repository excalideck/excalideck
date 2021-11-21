import { test } from "@playwright/test";
import ExcalideckEditorPage from "../ExcalideckEditorPage";

test("Skip a slide", async ({ page }) => {
    const excalideckEditorPage = new ExcalideckEditorPage(page);
    await excalideckEditorPage.go();
    await excalideckEditorPage.drawRectangle();
    await excalideckEditorPage.addSlide();
    await excalideckEditorPage.drawEllipse();
    await excalideckEditorPage.selectSlide(1);
    await excalideckEditorPage.skipSlide();
    await excalideckEditorPage.expectToSee(
        "two slide miniatures",
        "the second slide miniature is skipped"
    );
});
