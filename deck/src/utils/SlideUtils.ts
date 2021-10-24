import { nanoid } from "nanoid";
import ExcalidrawElement from "../entities/ExcalidrawElement";
import Slide from "../entities/Slide";
import SlideNotFoundAtPosition from "../errors/SlideNotFoundAtPosition";
import SlideNotFoundWithId from "../errors/SlideNotFoundWithId";

const SlideUtils = {
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
        return SlideUtils.updateById(slides, id, (slide) => ({
            ...slide,
            shouldRender,
        }));
    },

    updateShouldRenderWithCommonExcalidrawElementsById(
        slides: Slide[],
        id: string,
        shouldRenderWithCommonExcalidrawElements: boolean
    ): Slide[] {
        return SlideUtils.updateById(slides, id, (slide) => ({
            ...slide,
            shouldRenderWithCommonExcalidrawElements,
        }));
    },

    updateExcalidrawElementsById(
        slides: Slide[],
        id: string,
        excalidrawElements: ExcalidrawElement[]
    ): Slide[] {
        return SlideUtils.updateById(slides, id, (slide) => ({
            ...slide,
            excalidrawElements,
        }));
    },

    updateById(
        slides: Slide[],
        id: string,
        updater: (slide: Slide) => Slide
    ): Slide[] {
        return slides.map((slide) =>
            slide.id === id ? updater(slide) : slide
        );
    },

    removeById(slides: Slide[], id: string): Slide[] {
        return slides.filter((slide) => slide.id !== id);
    },

    moveSlide(slides: Slide[], from: number, to: number): Slide[] {
        SlideUtils.assertSlideExistsAtPosition(slides, from);
        SlideUtils.assertSlideExistsAtPosition(slides, to);
        const rearrangedSlides = [...slides];
        rearrangedSlides.splice(to, 0, rearrangedSlides.splice(from, 1)[0]!);
        return rearrangedSlides;
    },

    assertSlideExistsAtPosition(slides: Slide[], position: number) {
        if (position < 0 || position > slides.length - 1) {
            throw new SlideNotFoundAtPosition(position);
        }
    },
};
export default SlideUtils;
