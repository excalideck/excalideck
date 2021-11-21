import { test } from "@playwright/test";
import makeTestDeck from "./makeTestDeck";
import SlideRenderersPage from "./SlideRenderersPage";

test("canvasSlideRenderer.renderSlide renders the printable area of the supplied slide", async ({
    page,
}) => {
    const slideRenderersPage = new SlideRenderersPage(page);
    await slideRenderersPage.go();
    const deck = makeTestDeck();
    await slideRenderersPage.renderSlideCanvas(deck, deck.slides[0]!.id);
    await slideRenderersPage.verifySlideCanvas();
});
