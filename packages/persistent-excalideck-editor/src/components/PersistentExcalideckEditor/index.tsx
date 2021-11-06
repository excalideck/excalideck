import { Deck } from "@excalideck/deck";
import ExcalideckEditor from "@excalideck/excalideck-editor";
import usePersistentExcalideckEditorState from "../../hooks/usePersistentExcalideckEditorState";

interface Props {
    initialDeck: Deck;
    saveToLocalStorage: boolean;
}
export default function PersistentExcalideckEditor({
    initialDeck,
    saveToLocalStorage,
}: Props) {
    const { deck, fileSavingState, updateDeck, saveToFile, loadFromFile } =
        usePersistentExcalideckEditorState(initialDeck, saveToLocalStorage);
    return (
        <ExcalideckEditor
            key={fileSavingState?.fileName ?? "null"}
            initialDeck={deck}
            onDeckChange={updateDeck}
            fileSavingState={fileSavingState}
            onLoadFromFile={loadFromFile}
            onSaveToFile={saveToFile}
        />
    );
}
