import { nanoid } from "nanoid";
import ExcalidrawElement from "./entities/ExcalidrawElement";
import Slide from "./entities/Slide";
import SlideNotFoundAtIndex from "./errors/SlideNotFoundAtIndex";
import SlideNotFoundWithId from "./errors/SlideNotFoundWithId";

const SlideOperations = {
    addEmpty(slides: Slide[]): Slide[] {
        return [
            ...slides,
            {
                id: nanoid(),
                shouldRender: true,
                shouldRenderWithCommonExcalidrawElements: true,
                excalidrawElements: [],
            },
        ];
    },

    getById(slides: Slide[], id: string): Slide {
        const slide = slides.find((slide) => slide.id === id);
        if (!slide) {
            throw new SlideNotFoundWithId(id);
        }
        return slide;
    },

    updateShouldRenderById(
        slides: Slide[],
        id: string,
        shouldRender: boolean
    ): Slide[] {
        return SlideOperations.updateById(slides, id, (slide) => ({
            ...slide,
            shouldRender,
        }));
    },

    updateShouldRenderWithCommonExcalidrawElementsById(
        slides: Slide[],
        id: string,
        shouldRenderWithCommonExcalidrawElements: boolean
    ): Slide[] {
        return SlideOperations.updateById(slides, id, (slide) => ({
            ...slide,
            shouldRenderWithCommonExcalidrawElements,
        }));
    },

    updateExcalidrawElementsById(
        slides: Slide[],
        id: string,
        excalidrawElements: ExcalidrawElement[]
    ): Slide[] {
        return SlideOperations.updateById(slides, id, (slide) => ({
            ...slide,
            excalidrawElements,
        }));
    },

    updateById(
        slides: Slide[],
        id: string,
        updater: (slide: Slide) => Slide
    ): Slide[] {
        SlideOperations.assertSlideExistsWithId(slides, id);
        return slides.map((slide) =>
            slide.id === id ? updater(slide) : slide
        );
    },

    removeById(slides: Slide[], id: string): Slide[] {
        SlideOperations.assertSlideExistsWithId(slides, id);
        return slides.filter((slide) => slide.id !== id);
    },

    moveSlide(slides: Slide[], fromIndex: number, toIndex: number): Slide[] {
        SlideOperations.assertSlideExistsAtIndex(slides, fromIndex);
        SlideOperations.assertSlideExistsAtIndex(slides, toIndex);
        const rearrangedSlides = [...slides];
        rearrangedSlides.splice(
            toIndex,
            0,
            rearrangedSlides.splice(fromIndex, 1)[0]!
        );
        return rearrangedSlides;
    },

    assertSlideExistsWithId(slides: Slide[], id: string) {
        SlideOperations.getById(slides, id);
    },

    assertSlideExistsAtIndex(slides: Slide[], index: number) {
        if (index < 0 || index > slides.length - 1) {
            throw new SlideNotFoundAtIndex(index);
        }
    },
};
export default SlideOperations;
