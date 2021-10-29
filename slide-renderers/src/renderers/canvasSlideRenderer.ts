import {
    Deck,
    DeckOperations,
    ExcalidrawElement,
    PrintableArea,
} from "@excalideck/deck";
import { exportToCanvas } from "@excalidraw/excalidraw";
import SlideRenderer from "../SlideRenderer";

const EXCALIDRAW_EXPORT_DEFAULT_PADDING = 10;
const FAR_POINT = { x: -5_000, y: -5_000 };

const CanvasSlideRenderer: SlideRenderer<HTMLCanvasElement> = {
    renderSlide(deck: Deck, slideId: string): HTMLCanvasElement {
        const slide = DeckOperations.getSlide(deck, slideId);
        const { printableArea } = deck;
        const containingPerimeter = makeContainingPerimeter(printableArea);
        const excalidrawElements = [
            ...slide.excalidrawElements,
            ...(slide.shouldRenderWithCommonExcalidrawElements
                ? deck.commonExcalidrawElements
                : []),
            containingPerimeter,
        ];

        const drawingBoardCanvas = exportToCanvas({
            elements: excalidrawElements as any,
        });

        const slideCanvas = cropCanvas(
            drawingBoardCanvas,
            EXCALIDRAW_EXPORT_DEFAULT_PADDING - FAR_POINT.x,
            EXCALIDRAW_EXPORT_DEFAULT_PADDING - FAR_POINT.y,
            printableArea.width,
            printableArea.height
        );

        return slideCanvas;
    },
};
export default CanvasSlideRenderer;

function makeContainingPerimeter(
    printableArea: PrintableArea
): ExcalidrawElement {
    return {
        id: "containingPerimeter",
        versionNonce: 0,
        version: 0,
        type: "rectangle",
        x: FAR_POINT.x,
        y: FAR_POINT.y,
        width: -FAR_POINT.x + printableArea.width,
        height: -FAR_POINT.y + printableArea.height,
        angle: 0,
        strokeColor: "#000000",
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
