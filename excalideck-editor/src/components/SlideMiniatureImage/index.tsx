import { Deck, Slide } from "@excalideck/deck";
import { pngDataUrlSlideRenderer } from "@excalideck/slide-renderers";
import { random } from "lodash";
import { useEffect, useReducer } from "react";
import { useDebounce } from "react-use";
import "./index.css";

interface Props {
    deck: Deck;
    slide: Slide;
    slidePosition: number;
}
export default function SlideMiniatureImage({
    deck,
    slide,
    slidePosition,
}: Props) {
    const [imageSrc, triggerImageRender] = useReducer(
        () => pngDataUrlSlideRenderer.renderSlide(deck, slide.id),
        ""
    );

    // When the component first renders, don't render the slide image
    // immediately, as it's an expensive, synchronous operation, which might
    // cause the UI to lag. Instead, render it after $random ms
    useEffect(() => {
        setTimeout(triggerImageRender, random(0, 100, false));
    }, []);

    // When the slide changes, re-render the image at most once every 500 ms
    useDebounce(triggerImageRender, 500, [slide]);

    return imageSrc ? (
        <img
            className="SlideMiniatureImage"
            alt={`Slide ${slidePosition}`}
            key={imageSrc}
            src={imageSrc}
        />
    ) : null;
}
