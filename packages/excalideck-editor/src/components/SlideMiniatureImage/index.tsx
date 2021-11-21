import { Deck, Slide } from "@excalideck/deck";
import { canvasSlideRenderer } from "@excalideck/slide-renderers";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";
import { isCanvasRendered, renderCanvas } from "./canvasUtils";
import "./index.css";
import slideCanvasCache from "./slideCanvasCache";

const SLIDE_MINIATURE_IMAGE_RENDER_DEBOUNCE = parseInt(
    process.env["SLIDE_MINIATURE_IMAGE_RENDER_DEBOUNCE"] ?? "500",
    10
);

interface Props {
    deck: Deck;
    slide: Slide;
    slideIndex: number;
}
export default function SlideMiniatureImage({ deck, slide }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    const [debouncedDeck] = useDebounce(
        deck,
        SLIDE_MINIATURE_IMAGE_RENDER_DEBOUNCE
    );
    const [debouncedSlide] = useDebounce(
        slide,
        SLIDE_MINIATURE_IMAGE_RENDER_DEBOUNCE
    );

    useEffect(() => {
        // When no canvas has been rendered yet (i.e. it's the first render),
        // and there is a cached canvas, render it
        if (!isCanvasRendered(containerRef)) {
            const cachedSlideCanvas = slideCanvasCache.get(debouncedSlide.id);
            if (cachedSlideCanvas) {
                renderCanvas(containerRef, cachedSlideCanvas);
            }
        }

        // Update the canvas cache and re-render the canvas. This operation is
        // deferred to avoid blocking other more important work, like switching
        // view
        setTimeout(() => {
            const cachedSlideCanvas = slideCanvasCache.get(debouncedSlide.id);
            const updatedSlideCanvas = canvasSlideRenderer.renderSlide(
                debouncedDeck,
                debouncedSlide.id,
                1
            );
            if (updatedSlideCanvas !== cachedSlideCanvas) {
                renderCanvas(containerRef, updatedSlideCanvas);
                slideCanvasCache.set(debouncedSlide.id, updatedSlideCanvas);
            }
        }, 0);
    }, [debouncedDeck, debouncedSlide]);

    const slideAspectRatio =
        deck.printableArea.width / deck.printableArea.height;
    const miniatureAspectRatio = 3 / 2;
    return (
        <div
            ref={containerRef}
            className={clsx(
                "SlideMiniatureImage",
                slideAspectRatio < miniatureAspectRatio
                    ? "HeightCappedSlideMiniatureImage"
                    : "WidthCappedSlideMiniatureImage"
            )}
        />
    );
}
