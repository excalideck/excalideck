import { test } from "@playwright/test";
import makeTestDeck from "./makeTestDeck";
import SlideRenderersPage from "./SlideRenderersPage";

test.describe(
    "pngBlobSlideRenderer.renderSlide renders the printable area of the supplied slide",
    () => {
        const scales = [1, 2];
        scales.forEach((scale, testCase) => {
            test(`case ${testCase}: scale = ${scale}`, async ({ page }) => {
                const slideRenderersPage = new SlideRenderersPage(page);
                await slideRenderersPage.go();
                const deck = makeTestDeck();
                await slideRenderersPage.renderSlidePngBlob(
                    deck,
                    deck.slides[0]!.id,
                    scale
                );
                await slideRenderersPage.verifySlidePngBlob(testCase);
            });
        });
    }
);
