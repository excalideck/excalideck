import { useState } from "react";
import { useDebounce } from "react-use";
import makePrintableAreaPerimeterTransparent from "../../entities/PrintableArea/makePrintableAreaPerimeterTransparent";
import Slide from "../../entities/Slide";
import exportElementsToDataUrl from "../../utils/exportElementsToDataUrl";
import "./index.css";

export interface Props {
    slide: Slide;
    slidePosition: number;
}
export default function SlideMiniatureImage({ slide, slidePosition }: Props) {
    const [imageSrc, setImageSrc] = useState<string | undefined>();
    useDebounce(
        () =>
            setImageSrc(
                exportElementsToDataUrl(
                    makePrintableAreaPerimeterTransparent(slide.elements)
                )
            ),
        500,
        [slide]
    );
    return imageSrc ? (
        <img
            className="SlideMiniatureImage"
            alt={`Slide ${slidePosition}`}
            key={imageSrc}
            src={imageSrc}
        />
    ) : null;
}
