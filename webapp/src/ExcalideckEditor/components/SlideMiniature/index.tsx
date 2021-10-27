import { Slide } from "@excalideck/deck";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import SlideMiniatureImage from "../SlideMiniatureImage";
import "./index.css";

export interface Props {
    slide: Slide;
    slidePosition: number;
    isSlideSelected: boolean;
}
export default function SlideMiniature({
    slide,
    slidePosition,
    isSlideSelected,
}: Props) {
    return (
        <div
            className={clsx(
                "SlideMiniature",
                isSlideSelected && "SelectedSlideMiniature",
                !slide.shouldRender && "NonRenderingSlideMiniature"
            )}
        >
            <div className="SlideMiniatureLayer">
                <SlideMiniatureImage
                    slide={slide}
                    slidePosition={slidePosition}
                />
            </div>
            <div className="SlideMiniatureLayer">
                {!slide.shouldRender ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                ) : null}
            </div>
        </div>
    );
}
