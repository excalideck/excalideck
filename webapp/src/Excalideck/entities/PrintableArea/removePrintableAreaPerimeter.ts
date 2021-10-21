import ExcalidrawElement from "../ExcalidrawElement";
import PrintableAreaPerimeterId from "./PrintableAreaPerimeterId";

export default function removePrintableAreaPerimeter(
    elements: ExcalidrawElement[]
): ExcalidrawElement[] {
    return elements.filter(
        (element) => element.id !== PrintableAreaPerimeterId
    );
}
