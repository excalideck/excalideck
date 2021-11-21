import { test } from "@playwright/test";
import ExcalideckEditorPage from "../ExcalideckEditorPage";

test("Draw simple shapes in multiple slides", async ({ page }) => {
    const excalideckEditorPage = new ExcalideckEditorPage(page);
    await excalideckEditorPage.go();
    await excalideckEditorPage.drawRectangle();
    await excalideckEditorPage.addSlide();
    await excalideckEditorPage.drawEllipse();
    await excalideckEditorPage.expectToSee(
        "two slide miniatures",
        "the second slide miniature as selected",
        "an ellipse in the drawing area",
        'the corresponding ellipse "reflected" in the selected slide miniature',
        "a rectangle in the non-selected slide miniature"
    );
});
