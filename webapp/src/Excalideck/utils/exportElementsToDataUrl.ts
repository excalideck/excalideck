import { exportToCanvas } from "@excalidraw/excalidraw";
import ExcalidrawElement from "../entities/ExcalidrawElement";

export default function exportElementsToDataUrl(
    elements: ExcalidrawElement[]
): string {
    return exportToCanvas({
        elements: elements as any,
    }).toDataURL();
}
