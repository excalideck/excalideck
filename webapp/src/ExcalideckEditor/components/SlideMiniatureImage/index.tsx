import { Slide } from "@excalideck/deck";
import { useState } from "react";
import { useDebounce } from "react-use";
import exportSlideToDataUrl from "../../utils/exportSlideToDataUrl";
import "./index.css";

export interface Props {
    slide: Slide;
    slidePosition: number;
}
export default function SlideMiniatureImage({ slide, slidePosition }: Props) {
    const [imageSrc, setImageSrc] = useState<string | undefined>();
    useDebounce(() => setImageSrc(exportSlideToDataUrl(slide)), 500, [slide]);
    return imageSrc ? (
        <img
            className="SlideMiniatureImage"
            alt={`Slide ${slidePosition}`}
            key={imageSrc}
            src={imageSrc}
        />
    ) : null;
}
