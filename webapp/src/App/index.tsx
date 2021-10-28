import { Deck } from "@excalideck/deck";
import ExcalideckEditor from "@excalideck/excalideck-editor";
import usePersistentDeck from "./hooks/usePersistentDeck";

interface Props {
    initialDeck: Deck;
}
export default function App({ initialDeck }: Props) {
    const { deck, persistenceState, updateDeck, saveFile, openFile } =
        usePersistentDeck(initialDeck);
    return (
        <ExcalideckEditor
            key={persistenceState?.storageName ?? "localStorage"}
            initialDeck={deck}
            onDeckChange={updateDeck}
            persistenceState={persistenceState}
            onOpen={openFile}
            onSave={saveFile}
        />
    );
}
