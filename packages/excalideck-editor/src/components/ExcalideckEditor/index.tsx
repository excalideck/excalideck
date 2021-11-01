import { Deck } from "@excalideck/deck";
import FileSavingState from "../../entities/FileSavingState";
import useExcalideckEditorState from "../../hooks/useExcalideckEditorState";
import ControlPane from "../ControlPane";
import DrawingPane from "../DrawingPane";
import "./index.css";

interface Props {
    initialDeck: Deck;
    onDeckChange: (newDeck: Deck) => void;
    fileSavingState: FileSavingState;
    onLoadFromFile: () => void;
    onSaveToFile: () => void;
}
export default function ExcalideckEditor({
    initialDeck,
    onDeckChange,
    fileSavingState,
    onLoadFromFile,
    onSaveToFile,
}: Props) {
    const {
        activeView,
        activateView,
        deck,
        addEmptySlide,
        moveSlide,
        updateCommonExcalidrawElements,
        updatePrintableArea,
        selectedSlide,
        deleteSlide,
        selectSlide,
        updateSlideExcalidrawElements,
        updateSlideShouldRender,
        updateSlideShouldRenderWithCommonExcalidrawElements,
    } = useExcalideckEditorState(initialDeck, onDeckChange);
    return (
        <div className="ExcalideckEditor">
            <DrawingPane
                activeView={activeView}
                deck={deck}
                onUpdateCommonExcalidrawElements={
                    updateCommonExcalidrawElements
                }
                selectedSlide={selectedSlide}
                onUpdateSlideExcalidrawElements={updateSlideExcalidrawElements}
            />
            <ControlPane
                activeView={activeView}
                onActivateView={activateView}
                deck={deck}
                onAddEmptySlide={addEmptySlide}
                onMoveSlide={moveSlide}
                onUpdatePrintableArea={updatePrintableArea}
                selectedSlide={selectedSlide}
                onDeleteSlide={deleteSlide}
                onSelectSlide={selectSlide}
                onUpdateSlideShouldRender={updateSlideShouldRender}
                onUpdateSlideShouldRenderWithCommonExcalidrawElements={
                    updateSlideShouldRenderWithCommonExcalidrawElements
                }
                fileSavingState={fileSavingState}
                onLoadFromFile={onLoadFromFile}
                onSaveToFile={onSaveToFile}
            />
        </div>
    );
}
