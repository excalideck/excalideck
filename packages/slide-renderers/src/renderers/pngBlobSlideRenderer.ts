import { Deck, DeckOperations, Hash } from "@excalideck/deck";
import SlideRenderer from "../SlideRenderer";
import lruMemoize from "../utils/lruMemoize";
import canvasSlideRenderer from "./canvasSlideRenderer";

const pngBlobSlideRenderer: SlideRenderer<Promise<Blob>> = {
    renderSlide: lruMemoize(
        (deck: Deck, slideId: string): Promise<Blob> =>
            new Promise((resolve, reject) => {
                canvasSlideRenderer
                    .renderSlide(deck, slideId)
                    .toBlob((blob) =>
                        blob !== null
                            ? resolve(blob)
                            : reject(
                                  new Error(
                                      "canvasSlide.toBlob didn't return any blob"
                                  )
                              )
                    );
            }),
        {
            maxSize: 100,
            getCacheKey: (deck, slideId) =>
                Hash.excalidrawElements(deck.commonExcalidrawElements) +
                Hash.printableArea(deck.printableArea) +
                Hash.slide(DeckOperations.getSlide(deck, slideId)),
        }
    ),
};
export default pngBlobSlideRenderer;
