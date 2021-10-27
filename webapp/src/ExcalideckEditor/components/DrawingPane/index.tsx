import { Deck, ExcalidrawElement, Hash, Slide } from "@excalideck/deck";
import { useCallback } from "react";
import View from "../../entities/View";
import ExcalidrawElementUtils from "../../utils/ExcalidrawElementUtils";
import ExcalidrawElementsInput from "../ExcalidrawElementsInput";

interface Props {
    activeView: View;
    deck: Deck;
    onUpdateCommonExcalidrawElements: (
        commonExcalidrawElements: ExcalidrawElement[]
    ) => void;
    selectedSlide: Slide;
    onUpdateSelectedSlideExcalidrawElements: (
        excalidrawElements: ExcalidrawElement[]
    ) => void;
}
export default function DrawingPane({
    activeView,
    deck,
    onUpdateCommonExcalidrawElements,
    selectedSlide,
    onUpdateSelectedSlideExcalidrawElements,
}: Props) {
    const onChange = useCallback(
        (updatedExcalidrawElements) => {
            if (activeView === View.Slides) {
                onUpdateSelectedSlideExcalidrawElements(
                    ExcalidrawElementUtils.extractSlideExcalidrawElements(
                        updatedExcalidrawElements,
                        deck.commonExcalidrawElements
                    )
                );
            } else {
                onUpdateCommonExcalidrawElements(
                    ExcalidrawElementUtils.extractCommonExcalidrawElements(
                        updatedExcalidrawElements
                    )
                );
            }
        },
        [
            activeView,
            deck.commonExcalidrawElements,
            onUpdateCommonExcalidrawElements,
            onUpdateSelectedSlideExcalidrawElements,
        ]
    );
    return (
        <ExcalidrawElementsInput
            key={[
                selectedSlide.id,
                selectedSlide.shouldRenderWithCommonExcalidrawElements,
                activeView,
                Hash.printableArea(deck.printableArea),
            ].join()}
            printableArea={deck.printableArea}
            initialValue={
                activeView === View.Slides
                    ? ExcalidrawElementUtils.getSlideExcalidrawElements(
                          deck,
                          selectedSlide.id
                      )
                    : ExcalidrawElementUtils.getCommonExcalidrawElements(deck)
            }
            onChange={onChange}
        />
    );
}
