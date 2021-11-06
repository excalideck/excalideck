import { RefObject } from "react";

export function isCanvasRendered(
    containerRef: RefObject<HTMLDivElement>
): boolean {
    return containerRef.current?.firstChild !== null;
}

export function renderCanvas(
    containerRef: RefObject<HTMLDivElement>,
    canvas: HTMLCanvasElement
) {
    if (containerRef.current !== null) {
        const clone = cloneCanvas(canvas);
        if (containerRef.current.firstChild) {
            containerRef.current.firstChild.replaceWith(clone);
        } else {
            containerRef.current.appendChild(clone);
        }
    }
}

function cloneCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
    const clone = document.createElement("canvas");
    clone.width = canvas.width;
    clone.height = canvas.height;
    clone.getContext("2d")!.drawImage(canvas, 0, 0);
    return clone;
}
