import { Deck, DeckOperations, Hash, PrintableArea } from "@excalideck/deck";
import { exportToCanvas } from "@excalidraw/excalidraw";
import { nanoid } from "nanoid";
import SlideRenderer from "../../SlideRenderer";
import lruMemoize from "../../utils/lruMemoize";

const EXCALIDRAW_EXPORT_DEFAULT_PADDING = 10;

const canvasSlideRenderer: SlideRenderer<HTMLCanvasElement> = {
    renderSlide: lruMemoize(
        (deck: Deck, slideId: string, scale: number): HTMLCanvasElement => {
            const slide = DeckOperations.getSlide(deck, slideId);
            const { printableArea } = deck;

            const farAwayRectangle = getFarAwayRectangle(printableArea);
            const excalidrawElements = [
                ...slide.excalidrawElements,
                ...(slide.shouldRenderWithCommonExcalidrawElements
                    ? deck.commonExcalidrawElements
                    : []),
                farAwayRectangle,
            ];

            const drawingBoardCanvas = exportToCanvas({
                elements: excalidrawElements as any,
                getDimensions: (width, height) => ({
                    width: width * scale,
                    height: height * scale,
                    scale,
                }),
            });

            const slideCanvas = cropCanvas(
                drawingBoardCanvas,
                (EXCALIDRAW_EXPORT_DEFAULT_PADDING - farAwayRectangle.x) *
                    scale,
                (EXCALIDRAW_EXPORT_DEFAULT_PADDING - farAwayRectangle.y) *
                    scale,
                printableArea.width * scale,
                printableArea.height * scale
            );
            // Assign a random id so tests can distinguish between canvases
            slideCanvas.setAttribute("data-testid", nanoid());

            return slideCanvas;
        },
        {
            maxSize: 100,
            getCacheKey: (deck, slideId, scale) =>
                Hash.excalidrawElements(deck.commonExcalidrawElements) +
                Hash.printableArea(deck.printableArea) +
                Hash.slide(DeckOperations.getSlide(deck, slideId)) +
                scale * 37,
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

function getFarAwayRectangle(printableArea: PrintableArea) {
    const FAR = 4_500;
    return {
        id: "FAR_AWAY_RECTANGLE",
        versionNonce: 0,
        version: 0,
        type: "rectangle",
        x: -FAR,
        y: -FAR,
        width: FAR + printableArea.width + 10,
        height: FAR + printableArea.height + 10,
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
    };
}
