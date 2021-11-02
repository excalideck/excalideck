import { Deck } from "@excalideck/deck";
import ExcalideckEditor from "@excalideck/excalideck-editor";
import usePersistentExcalideckEditorState from "../../hooks/usePersistentExcalideckEditorState";

interface Props {
    initialDeck: Deck;
}
export default function PersistentExcalideckEditor({ initialDeck }: Props) {
    const { deck, fileSavingState, updateDeck, saveToFile, loadFromFile } =
        usePersistentExcalideckEditorState(initialDeck);
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
