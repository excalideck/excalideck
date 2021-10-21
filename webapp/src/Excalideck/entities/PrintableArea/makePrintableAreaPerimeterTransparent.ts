import ExcalidrawElement from "../ExcalidrawElement";
import PrintableAreaPerimeterId from "./PrintableAreaPerimeterId";

export default function makePrintableAreaPerimeterTransparent(
    elements: ExcalidrawElement[]
): ExcalidrawElement[] {
    return elements.map((element) =>
        element.id === PrintableAreaPerimeterId
            ? { ...element, strokeColor: "transparent" }
            : element
    );
}
