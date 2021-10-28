import { Slide } from "@excalideck/deck";
import { exportToCanvas } from "@excalidraw/excalidraw";

// const EXCALIDRAW_EXPORT_DEFAULT_PADDING = 10;
// const FAR_POINT: Point = { x: -10000, y: -10000 };
export default function exportSlideToDataUrl(slide: Slide): string {
    // const elements = [
    //     ...makePrintableAreaPerimeterTransparent(slide.elements),
    //     // TODO: use another function
    //     makePrintableAreaPerimeter({
    //         topLeftCorner: FAR_POINT,
    //         bottomRightCorner: { x: 0, y: 0 },
    //     }),
    // ];
    const drawingBoardCanvas = exportToCanvas({
        elements: slide.excalidrawElements as any,
    });
    // const slideCanvas = cropCanvas(
    //     drawingBoardCanvas,
    //     EXCALIDRAW_EXPORT_DEFAULT_PADDING -
    //         (FAR_POINT.x - printableAreaPerimeter.x),
    //     EXCALIDRAW_EXPORT_DEFAULT_PADDING -
    //         (FAR_POINT.y - printableAreaPerimeter.y),
    //     printableAreaPerimeter.width,
    //     printableAreaPerimeter.height
    // );

    return drawingBoardCanvas.toDataURL();
}

// function cropCanvas(
//     canvas: HTMLCanvasElement,
//     left: number,
//     top: number,
//     width: number,
//     height: number
// ): HTMLCanvasElement {
//     const croppedCanvas = document.createElement("canvas");
//     croppedCanvas.width = width;
//     croppedCanvas.height = height;
//     croppedCanvas
//         .getContext("2d")!
//         .drawImage(canvas, left, top, width, height, 0, 0, width, height);
//     return croppedCanvas;
// }
