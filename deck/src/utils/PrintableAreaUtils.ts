import ExcalidrawElement from "../entities/ExcalidrawElement";
import PrintableArea from "../entities/PrintableArea";

const PRINTABLE_AREA_EXCALIDRAW_ELEMENT_ID = "PRINTABLE_AREA";

const PrintableAreaUtils = {
    getExcalidrawElement(printableArea: PrintableArea): ExcalidrawElement {
        const { topLeftCorner, bottomRightCorner } = printableArea;
        return {
            id: PRINTABLE_AREA_EXCALIDRAW_ELEMENT_ID,
            versionNonce: 0,
            version: 0,
            type: "rectangle",
            x: topLeftCorner.x,
            y: topLeftCorner.y,
            width: bottomRightCorner.x - topLeftCorner.x,
            height: bottomRightCorner.y - topLeftCorner.y,
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
    },

    getExcalidrawElementId(): string {
        return PRINTABLE_AREA_EXCALIDRAW_ELEMENT_ID;
    },
};
export default PrintableAreaUtils;
