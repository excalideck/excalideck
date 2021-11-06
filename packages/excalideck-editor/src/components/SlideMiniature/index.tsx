import { Deck, Slide } from "@excalideck/deck";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { forwardRef } from "react";
import SlideMiniatureImage from "../SlideMiniatureImage";
import "./index.css";

export interface Props {
    deck: Deck;
    slide: Slide;
    slideIndex: number;
    isSlideSelected: boolean;
}
export default forwardRef<HTMLDivElement, Props>(function SlideMiniature(
    { deck, slide, slideIndex, isSlideSelected }: Props,
    ref
) {
    return (
        <div
            ref={ref}
            className={clsx(
                "SlideMiniature",
                isSlideSelected && "SelectedSlideMiniature"
            )}
        >
            <div className="SlideMiniatureLayer">
                <SlideMiniatureImage
                    deck={deck}
                    slide={slide}
                    slideIndex={slideIndex}
                />
            </div>
            {!slide.shouldRender ? (
                <div className="SlideMiniatureLayer NonRenderingSlideMiniatureMask">
                    <FontAwesomeIcon icon={faEyeSlash} />
                </div>
            ) : null}
        </div>
    );
});
