import { Deck } from "@excalideck/deck";
import { expect, Page } from "@playwright/test";

export default class SlideRenderersPage {
    constructor(private page: Page) {}

    async go() {
        await this.page.goto("/");
    }

    async renderSlideCanvas(deck: Deck, slideId: string) {
        await this.page.evaluate(
            ({ deck, slideId }) => {
                const slideCanvas = (
                    window as any
                ).canvasSlideRenderer.renderSlide(deck, slideId);
                document.body.appendChild(slideCanvas);
            },
            { deck, slideId }
        );
    }

    async verifySlideCanvas() {
        const slideCanvas = await this.page.locator("canvas");
        expect(await slideCanvas.screenshot()).toMatchSnapshot("result.png", {
            threshold: 0,
        });
    }

    async renderSlidePngBlob(deck: Deck, slideId: string) {
        await this.page.evaluate(
            async ({ deck, slideId }) => {
                const slidePngBlob: Blob = await (
                    window as any
                ).pngBlobSlideRenderer.renderSlide(deck, slideId);
                const slideImg = document.createElement("img");
                slideImg.setAttribute("src", URL.createObjectURL(slidePngBlob));
                document.body.appendChild(slideImg);
            },
            { deck, slideId }
        );
    }

    async verifySlidePngBlob() {
        const slideImg = await this.page.locator("img");
        expect(await slideImg.screenshot()).toMatchSnapshot("result.png", {
            threshold: 0,
        });
    }
}
