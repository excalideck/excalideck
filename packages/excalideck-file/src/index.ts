import { Deck, DeckOperations } from "@excalideck/deck";
import ExcalideckFileNotValid from "./errors/ExcalideckFileNotValid";

const ExcalideckFile = {
    extension: ".pdf",

    mimeType: "application/vdn.excalideck+pdf",

    async getDeckFromFile(file: File): Promise<Deck> {
        // TODO
        const fileText = await file.text();
        let deck: unknown;
        try {
            deck = JSON.parse(fileText);
        } catch {
            throw new ExcalideckFileNotValid();
        }
        return DeckOperations.parse(deck);
    },

    async getBlobFromDeck(deck: Deck): Promise<Blob> {
        // TODO
        return new Blob([JSON.stringify(deck)], {
            type: ExcalideckFile.mimeType,
        });
    },
};
export default ExcalideckFile;
