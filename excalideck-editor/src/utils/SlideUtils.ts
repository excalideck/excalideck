import { Slide } from "@excalideck/deck";

const SlideUtils = {
    getAdjacentSlideId(slides: Slide[], slideId: string): string | null {
        if (slides.length === 1) {
            return null;
        }
        const selectedSlideIndex = slides.findIndex(
            (slide) => slide.id === slideId
        );
        const adjacentSlideIndex =
            selectedSlideIndex === 0 ? 1 : selectedSlideIndex - 1;
        return slides[adjacentSlideIndex]!.id;
    },
};
export default SlideUtils;
