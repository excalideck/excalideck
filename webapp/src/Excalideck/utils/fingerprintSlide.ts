import Slide from "../entities/Slide";
import fingerprintExcalidrawElements from "./fingerprintExcalidrawElements";

export default function fingerprintSlide(slide: Slide): string {
    return [
        slide.id,
        slide.shouldRender,
        slide.shouldRenderWithCommonElements,
        fingerprintExcalidrawElements(slide.elements),
    ].join("");
}
