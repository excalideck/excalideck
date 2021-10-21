import Deck from "../../Excalideck/entities/Deck";

export default interface StorageFileDefinition {
    extension: string;
    mimeType: string;
    extractDeckFromFile(file: Blob): Promise<Deck>;
    createFileFromDeck(deck: Deck): Promise<Blob>;
}
