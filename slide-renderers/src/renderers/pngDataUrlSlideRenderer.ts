import { Deck, DeckOperations, Hash } from "@excalideck/deck";
import { memoize } from "lodash";
import SlideRenderer from "../SlideRenderer";
import canvasSlideRenderer from "./canvasSlideRenderer";

const pngDataUrlSlideRenderer: SlideRenderer<string> = {
    renderSlide: memoize(
        (deck: Deck, slideId: string): string =>
            canvasSlideRenderer.renderSlide(deck, slideId).toDataURL(),
        (deck: Deck, slideId: string): number =>
            Hash.excalidrawElements(deck.commonExcalidrawElements) +
            Hash.printableArea(deck.printableArea) +
            Hash.slide(DeckOperations.getSlide(deck, slideId))
    ),
};
export default pngDataUrlSlideRenderer;
