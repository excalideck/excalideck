import Rectangle from "../entities/Rectangle";

export default function fingerprintRectangle(rectangle: Rectangle): string {
    return [
        rectangle.topLeftCorner.x,
        rectangle.topLeftCorner.y,
        rectangle.bottomRightCorner.x,
        rectangle.bottomRightCorner.y,
    ].join("");
}
