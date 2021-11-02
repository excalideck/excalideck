import { Deck, Slide } from "@excalideck/deck";
import { pngBlobSlideRenderer } from "@excalideck/slide-renderers";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
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
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    // Re-render the image at most once every 500 ms
    const [{ deck: debouncedDeck, slide: debouncedSlide }] = useDebounce(
        { deck, slide },
        500,
        { leading: true, trailing: true }
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
            alt={`Slide ${slidePosition}`}
            key={imageSrc}
            src={imageSrc}
            onLoad={() => URL.revokeObjectURL(imageSrc)}
        />
    ) : null;
}
