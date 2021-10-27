import { Deck } from "@excalideck/deck";
import StorageFileDefinition from "../entities/StorageFileDefinition";

export default class JsonStorageFileDefinition
    implements StorageFileDefinition
{
    public extension = ".json";

    public mimeType = "application/json";

    async extractDeckFromFile(file: Blob): Promise<Deck> {
        return JSON.parse(await file.text());
    }

    async createFileFromDeck(deck: Deck): Promise<Blob> {
        return new Blob([JSON.stringify(deck)], { type: this.mimeType });
    }
}
