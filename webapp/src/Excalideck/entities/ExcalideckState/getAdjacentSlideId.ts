import Slide from "../Slide";

export default function getAdjacentSlideId(
    slides: Slide[],
    slideId: string
): string {
    const slideIndex = slides.findIndex((slide) => slide.id === slideId);
    const adjacentSlideIndex = slideIndex === 0 ? 1 : slideIndex - 1;
    return slides[adjacentSlideIndex]!.id;
}
