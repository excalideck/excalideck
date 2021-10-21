import ControlPane from "./components/ControlPane";
import DrawingPane from "./components/DrawingPane";
import Deck from "./entities/Deck";
import PersistenceState from "./entities/PersistenceState";
import useExcalideckState from "./hooks/useExcalideckState";
import "./index.css";

interface Props {
    initialDeck: Deck;
    onDeckChange: (newDeck: Deck) => void;
    persistenceState: PersistenceState;
    onOpen: () => void;
    onSave: () => void;
}
export default function Excalideck({
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
        updateDeckCommonElements,
        updatePrintableArea,
        selectedSlide,
        deleteSelectedSlide,
        selectSlide,
        updateSelectedSlideElements,
        updateSelectedSlideShouldRender,
        updateSelectedSlideShouldRenderWithCommonElements,
    } = useExcalideckState(initialDeck, onDeckChange);
    return (
        <div className="Excalideck">
            <DrawingPane
                activeView={activeView}
                deck={deck}
                onUpdateDeckCommonElements={updateDeckCommonElements}
                selectedSlide={selectedSlide}
                onUpdateSelectedSlideElements={updateSelectedSlideElements}
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
                onUpdateSelectedSlideShouldRenderWithCommonElements={
                    updateSelectedSlideShouldRenderWithCommonElements
                }
                persistenceState={persistenceState}
                onOpen={onOpen}
                onSave={onSave}
            />
        </div>
    );
}
