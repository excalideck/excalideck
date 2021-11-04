import { Deck, Slide } from "@excalideck/deck";
import {
    pngBlobSlideRenderer,
    pngDataUrlSlideRenderer,
} from "@excalideck/slide-renderers";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import "./index.css";

interface Props {
    deck: Deck;
    slide: Slide;
    slideIndex: number;
    forceSynchronousFirstRender?: boolean;
}
export default function SlideMiniatureImage({
    deck,
    slide,
    slideIndex,
    forceSynchronousFirstRender,
}: Props) {
    const [imageSrc, setImageSrc] = useState<string | null>(() =>
        forceSynchronousFirstRender
            ? pngDataUrlSlideRenderer.renderSlide(deck, slide.id)
            : null
    );

    // Re-render the image at most once every X ms
    const [{ deck: debouncedDeck, slide: debouncedSlide }] = useDebounce(
        { deck, slide },
        500,
        {
            leading: true,
            trailing: true,
            equalityFn: (prev, next) =>
                prev.deck === next.deck && prev.slide === next.slide,
        }
    );
    useEffect(() => {
        pngBlobSlideRenderer
            .renderSlide(debouncedDeck, debouncedSlide.id)
            .then((slidePngBlob) =>
                setImageSrc(URL.createObjectURL(slidePngBlob))
            );
    }, [debouncedDeck, debouncedSlide]);

    return imageSrc ? (
        <img
            className="SlideMiniatureImage"
            alt={`Slide ${slideIndex}`}
            src={imageSrc}
            onLoad={() => URL.revokeObjectURL(imageSrc)}
        />
    ) : null;
}
