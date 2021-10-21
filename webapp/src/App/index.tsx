import Excalideck from "../Excalideck";
import Deck from "../Excalideck/entities/Deck";
import usePersistentDeck from "./hooks/usePersistentDeck";

interface Props {
    initialDeck: Deck;
}
export default function App({ initialDeck }: Props) {
    const { deck, persistenceState, updateDeck, saveFile, openFile } =
        usePersistentDeck(initialDeck);
    return (
        <Excalideck
            key={persistenceState?.storageName ?? "localStorage"}
            initialDeck={deck}
            onDeckChange={updateDeck}
            persistenceState={persistenceState}
            onOpen={openFile}
            onSave={saveFile}
        />
    );
}
