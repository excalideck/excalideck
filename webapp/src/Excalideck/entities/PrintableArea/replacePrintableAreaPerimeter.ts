import ExcalidrawElement from "../ExcalidrawElement";
import removePrintableAreaPerimeter from "./removePrintableAreaPerimeter";

export default function replacePrintableAreaPerimeter(
    elements: ExcalidrawElement[],
    newPrintableAreaPerimeter: ExcalidrawElement
): ExcalidrawElement[] {
    return [
        newPrintableAreaPerimeter,
        ...removePrintableAreaPerimeter(elements),
    ];
}
