import Rectangle from "../Rectangle";
import PrintableAreaPerimeterId from "./PrintableAreaPerimeterId";

export default function makePrintableAreaPerimeter(printableArea: Rectangle) {
    const { topLeftCorner, bottomRightCorner } = printableArea;
    return {
        id: PrintableAreaPerimeterId,
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
        version: 0,
        versionNonce: 0,
        isDeleted: false,
        boundElementIds: null,
    };
}
