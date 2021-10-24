import Point from "./Point";

export default interface PrintableArea {
    readonly topLeftCorner: Point;
    readonly bottomRightCorner: Point;
}
