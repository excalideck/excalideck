import { Deck, DeckOperations, Hash } from "@excalideck/deck";
import SlideRenderer from "../SlideRenderer";
import lruMemoize from "../utils/lruMemoize";
import canvasSlideRenderer from "./canvasSlideRenderer";

const pngDataUrlSlideRenderer: SlideRenderer<string> = {
    renderSlide: lruMemoize(
        (deck: Deck, slideId: string): string =>
            canvasSlideRenderer.renderSlide(deck, slideId).toDataURL(),
        {
            maxSize: 100,
            getCacheKey: (deck, slideId) =>
                Hash.excalidrawElements(deck.commonExcalidrawElements) +
                Hash.printableArea(deck.printableArea) +
                Hash.slide(DeckOperations.getSlide(deck, slideId)),
        }
    ),
};
export default pngDataUrlSlideRenderer;
