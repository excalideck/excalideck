import Deck from "../../Excalideck/entities/Deck";
import StorageFileDefinition from "../entities/StorageFileDefinition";

export default class JsonStorageFileDefinition
    implements StorageFileDefinition
{
    public extension = ".excalideck";

    // TODO: register @ https://www.iana.org/
    public mimeType = "application/vdn.excalideck+json";

    async extractDeckFromFile(file: Blob): Promise<Deck> {
        return JSON.parse(await file.text());
    }

    async createFileFromDeck(deck: Deck): Promise<Blob> {
        return new Blob([JSON.stringify(deck)], { type: this.mimeType });
    }
}
