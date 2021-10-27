import { Deck } from "@excalideck/deck";
import ControlPane from "./components/ControlPane";
import DrawingPane from "./components/DrawingPane";
import PersistenceState from "./entities/PersistenceState";
import useExcalideckEditorState from "./hooks/useExcalideckEditorState";
import "./index.css";

interface Props {
    initialDeck: Deck;
    onDeckChange: (newDeck: Deck) => void;
    persistenceState: PersistenceState;
    onOpen: () => void;
    onSave: () => void;
}
export default function ExcalideckEditor({
    initialDeck,
    onDeckChange,
    persistenceState,
    onOpen,
    onSave,
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
        deleteSelectedSlide,
        selectSlide,
        updateSelectedSlideExcalidrawElements,
        updateSelectedSlideShouldRender,
        updateSelectedSlideShouldRenderWithCommonExcalidrawElements,
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
                onUpdateSelectedSlideExcalidrawElements={
                    updateSelectedSlideExcalidrawElements
                }
            />
            <ControlPane
                activeView={activeView}
                onActivateView={activateView}
                deck={deck}
                onAddEmptySlide={addEmptySlide}
                onMoveSlide={moveSlide}
                onUpdatePrintableArea={updatePrintableArea}
                selectedSlide={selectedSlide}
                onDeleteSelectedSlide={deleteSelectedSlide}
                onSelectSlide={selectSlide}
                onUpdateSelectedSlideShouldRender={
                    updateSelectedSlideShouldRender
                }
                onUpdateSelectedSlideShouldRenderWithCommonExcalidrawElements={
                    updateSelectedSlideShouldRenderWithCommonExcalidrawElements
                }
                persistenceState={persistenceState}
                onOpen={onOpen}
                onSave={onSave}
            />
        </div>
    );
}
