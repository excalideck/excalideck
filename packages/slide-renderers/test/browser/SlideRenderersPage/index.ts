import { Deck } from "@excalideck/deck";
import { expect, Page } from "@playwright/test";

export default class SlideRenderersPage {
    constructor(private page: Page) {}

    async go() {
        await this.page.goto("/");
    }

    async renderSlideCanvas(deck: Deck, slideId: string, scale: number) {
        await this.page.evaluate(
            ({ deck, slideId, scale }) => {
                const slideCanvas = (
                    window as any
                ).canvasSlideRenderer.renderSlide(deck, slideId, scale);
                document.body.appendChild(slideCanvas);
            },
            { deck, slideId, scale }
        );
    }

    async verifySlideCanvas(testCase: number) {
        const slideCanvas = await this.page.locator("canvas");
        expect(await slideCanvas.screenshot()).toMatchSnapshot(
            `result-${testCase}.png`,
            { threshold: 0 }
        );
    }

    async renderSlidePngBlob(deck: Deck, slideId: string, scale: number) {
        await this.page.evaluate(
            async ({ deck, slideId, scale }) => {
                const slidePngBlob: Blob = await (
                    window as any
                ).pngBlobSlideRenderer.renderSlide(deck, slideId, scale);
                const slideImg = document.createElement("img");
                slideImg.setAttribute("src", URL.createObjectURL(slidePngBlob));
                document.body.appendChild(slideImg);
            },
            { deck, slideId, scale }
        );
    }

    async verifySlidePngBlob(testCase: number) {
        const slideImg = await this.page.locator("img");
        expect(await slideImg.screenshot()).toMatchSnapshot(
            `result-${testCase}.png`,
            { threshold: 0 }
        );
    }
}
