import { Deck, Slide } from "../../src";

export function makeSlides(ids: string[]): Slide[] {
    return ids.map((id) => ({
        id,
        shouldRender: true,
        shouldRenderWithCommonExcalidrawElements: true,
        excalidrawElements: [],
    }));
}

export function getSlideIds(deck: Deck): string[] {
    return deck.slides.map((slide) => slide.id);
}
