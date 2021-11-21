import { Deck, DeckOperations, Hash } from "@excalideck/deck";
import { exportToCanvas } from "@excalidraw/excalidraw";
import { nanoid } from "nanoid";
import SlideRenderer from "../../SlideRenderer";
import lruMemoize from "../../utils/lruMemoize";

const EXCALIDRAW_EXPORT_DEFAULT_PADDING = 10;
const FAR_AWAY_RECTANGLE = Object.freeze({
    id: "FAR_AWAY_RECTANGLE",
    versionNonce: 0,
    version: 0,
    type: "rectangle",
    x: -5_000,
    y: -5_000,
    width: 1,
    height: 1,
    angle: 0,
    strokeColor: "transparent",
    backgroundColor: "transparent",
    fillStyle: "hachure",
    strokeWidth: 1,
    strokeStyle: "solid",
    roughness: 0,
    opacity: 100,
    groupIds: [],
    strokeSharpness: "sharp",
    seed: 0,
    isDeleted: false,
    boundElementIds: null,
});

const canvasSlideRenderer: SlideRenderer<HTMLCanvasElement> = {
    renderSlide: lruMemoize(
        (deck: Deck, slideId: string): HTMLCanvasElement => {
            const slide = DeckOperations.getSlide(deck, slideId);
            const { printableArea } = deck;

            const excalidrawElements = [
                ...slide.excalidrawElements,
                ...(slide.shouldRenderWithCommonExcalidrawElements
                    ? deck.commonExcalidrawElements
                    : []),
                FAR_AWAY_RECTANGLE,
            ];

            const drawingBoardCanvas = exportToCanvas({
                elements: excalidrawElements as any,
            });

            const slideCanvas = cropCanvas(
                drawingBoardCanvas,
                EXCALIDRAW_EXPORT_DEFAULT_PADDING - FAR_AWAY_RECTANGLE.x,
                EXCALIDRAW_EXPORT_DEFAULT_PADDING - FAR_AWAY_RECTANGLE.y,
                printableArea.width,
                printableArea.height
            );
            // Assign a random id so tests can distinguish between canvases
            slideCanvas.setAttribute("data-testid", nanoid());

            return slideCanvas;
        },
        {
            maxSize: 100,
            getCacheKey: (deck, slideId) =>
                Hash.excalidrawElements(deck.commonExcalidrawElements) +
                Hash.printableArea(deck.printableArea) +
                Hash.slide(DeckOperations.getSlide(deck, slideId)),
        }
    ),
};
export default canvasSlideRenderer;

function cropCanvas(
    canvas: HTMLCanvasElement,
    left: number,
    top: number,
    width: number,
    height: number
): HTMLCanvasElement {
    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = width;
    croppedCanvas.height = height;
    croppedCanvas
        .getContext("2d")!
        .drawImage(canvas, left, top, width, height, 0, 0, width, height);
    return croppedCanvas;
}
