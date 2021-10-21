import Deck from "../Deck";
import ExcalidrawElement from "../ExcalidrawElement";
import makePrintableAreaPerimeter from "../PrintableArea/makePrintableAreaPerimeter";
import removePrintableAreaPerimeter from "../PrintableArea/removePrintableAreaPerimeter";
import replacePrintableAreaPerimeter from "../PrintableArea/replacePrintableAreaPerimeter";
import Rectangle from "../Rectangle";
import Slide from "../Slide";
import View from "../View";
import getSelectedSlideIdAfterDeletion from "./getSelectedSlideIdAfterDeletion";
import makeEmptySlide from "./makeEmptySlide";
import moveArrayElement from "./moveArrayElement";
import removeCommonElements from "./removeCommonElements";

// TODO(REFACTOR): move this to a core package, possibly organizing the methods
// as usecases
export default class ExcalideckState {
    private constructor(
        public activeView: View,
        public deck: Deck,
        public selectedSlideId: string,
        public selectedSlide: Slide = deck.slides.find(
            (slide) => slide.id === selectedSlideId
        )!
    ) {}

    static from({
        activeView,
        deck,
        selectedSlideId,
    }: {
        activeView: View;
        deck: Deck;
        selectedSlideId: string;
    }): ExcalideckState {
        return new ExcalideckState(activeView, deck, selectedSlideId);
    }

    activateView(view: View): ExcalideckState {
        return new ExcalideckState(view, this.deck, this.selectedSlideId);
    }

    addEmptySlide(): ExcalideckState {
        const emptySlide = makeEmptySlide(this.deck);
        return new ExcalideckState(
            this.activeView,
            { ...this.deck, slides: [...this.deck.slides, emptySlide] },
            emptySlide.id
        );
    }

    deleteSelectedSlide(): ExcalideckState {
        const newSlides = this.deck.slides.filter(
            (slide) => slide.id !== this.selectedSlideId
        );
        if (newSlides.length === 0) {
            // If the slide to be deleted is the only slide in the deck, delete
            // it and re-create an empty slide (decks must always have at least
            // one slide)
            const emptySlide = makeEmptySlide(this.deck);
            return new ExcalideckState(
                this.activeView,
                { ...this.deck, slides: [emptySlide] },
                emptySlide.id
            );
        } else {
            // Else, delete the slide and mark an adjacent one as selected
            return new ExcalideckState(
                this.activeView,
                { ...this.deck, slides: newSlides },
                getSelectedSlideIdAfterDeletion(this.deck, this.selectedSlideId)
            );
        }
    }

    updateDeckCommonElements(
        commonElements: ExcalidrawElement[]
    ): ExcalideckState {
        return new ExcalideckState(
            this.activeView,
            {
                ...this.deck,
                commonElements,
                slides: this.deck.slides.map((slide) => ({
                    ...slide,
                    elements: slide.shouldRenderWithCommonElements
                        ? [
                              ...removeCommonElements(
                                  slide.elements,
                                  this.deck.commonElements
                              ),
                              ...removePrintableAreaPerimeter(commonElements),
                          ]
                        : slide.elements,
                })),
            },
            this.selectedSlideId
        );
    }

    updatePrintableArea(printableArea: Rectangle): ExcalideckState {
        const printableAreaPerimeter =
            makePrintableAreaPerimeter(printableArea);
        return new ExcalideckState(
            this.activeView,
            {
                printableArea,
                slides: this.deck.slides.map((slide) => ({
                    ...slide,
                    elements: replacePrintableAreaPerimeter(
                        slide.elements,
                        printableAreaPerimeter
                    ),
                })),
                commonElements: replacePrintableAreaPerimeter(
                    this.deck.commonElements,
                    printableAreaPerimeter
                ),
            },
            this.selectedSlideId
        );
    }

    moveSlide(fromIndex: number, toIndex: number): ExcalideckState {
        return new ExcalideckState(
            this.activeView,
            {
                ...this.deck,
                slides: moveArrayElement(this.deck.slides, fromIndex, toIndex),
            },
            this.selectedSlideId
        );
    }

    selectSlide(slideId: string): ExcalideckState {
        return new ExcalideckState(this.activeView, this.deck, slideId);
    }

    updateSelectedSlideElements(
        elements: ExcalidrawElement[]
    ): ExcalideckState {
        return new ExcalideckState(
            this.activeView,
            {
                ...this.deck,
                slides: this.deck.slides.map((slide) =>
                    slide.id === this.selectedSlideId
                        ? { ...slide, elements }
                        : slide
                ),
            },
            this.selectedSlideId
        );
    }

    updateSelectedSlideShouldRender(shouldRender: boolean): ExcalideckState {
        return new ExcalideckState(
            this.activeView,
            {
                ...this.deck,
                slides: this.deck.slides.map((slide) =>
                    slide.id === this.selectedSlideId
                        ? { ...slide, shouldRender }
                        : slide
                ),
            },
            this.selectedSlideId
        );
    }

    updateSelectedSlideShouldRenderWithCommonElements(
        shouldRenderWithCommonElements: boolean
    ): ExcalideckState {
        return new ExcalideckState(
            this.activeView,
            {
                ...this.deck,
                slides: this.deck.slides.map((slide) =>
                    slide.id === this.selectedSlideId
                        ? {
                              ...slide,
                              shouldRenderWithCommonElements,
                              elements: shouldRenderWithCommonElements
                                  ? [
                                        ...slide.elements,
                                        ...removePrintableAreaPerimeter(
                                            this.deck.commonElements
                                        ),
                                    ]
                                  : removeCommonElements(
                                        slide.elements,
                                        this.deck.commonElements
                                    ),
                          }
                        : slide
                ),
            },
            this.selectedSlideId
        );
    }
}
