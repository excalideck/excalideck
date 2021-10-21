import ExcalidrawElement from "../ExcalidrawElement";
import removePrintableAreaPerimeter from "../PrintableArea/removePrintableAreaPerimeter";

export default function removeCommonElements(
    elements: ExcalidrawElement[],
    commonElements: ExcalidrawElement[]
): ExcalidrawElement[] {
    const commonElementsIds = new Set(
        removePrintableAreaPerimeter(commonElements).map(
            (element) => element.id
        )
    );
    return elements.filter((element) => !commonElementsIds.has(element.id));
}
