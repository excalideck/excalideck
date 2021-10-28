import {
    fileOpen,
    fileSave,
    FileSystemHandle,
} from "@dwelle/browser-fs-access";
import { Deck } from "@excalideck/deck";
import {
    PersistenceState,
    PersistenceStateStatus,
} from "@excalideck/excalideck-editor";
import { useState } from "react";
import JsonStorageFileDefinition from "../storageFileDefinitions/JSONStorageFileDefinition";

const jsonStorageFileDefinition = new JsonStorageFileDefinition();

interface PersistentDeckState {
    persistenceState: PersistenceState;
    openFileHandle: FileSystemHandle | null;
    deck: Deck;
}

export default function usePersistentDeck(initialDeck: Deck) {
    const [appState, setAppState] = useState<PersistentDeckState>({
        persistenceState: null,
        openFileHandle: null,
        deck: initialDeck,
    });

    async function openFile() {
        const file = await fileOpen({
            extensions: [jsonStorageFileDefinition.extension],
            description: "Open Excalideck file",
            id: "Excalideck",
        });
        const deck = await jsonStorageFileDefinition.extractDeckFromFile(file);
        setAppState({
            persistenceState: {
                storageName: file.name,
                status: PersistenceStateStatus.AllChangesSaved,
                savingError: null,
            },
            openFileHandle: file.handle ?? null,
            deck,
        });
    }

    function updateDeck(deck: Deck) {
        setAppState((latestAppState) => ({
            ...latestAppState,
            deck,
            persistenceState: latestAppState.persistenceState
                ? {
                      ...latestAppState.persistenceState,
                      status: PersistenceStateStatus.SomeUnsavedChanges,
                  }
                : null,
        }));
    }

    async function saveFile() {
        const handle = await fileSave(
            await jsonStorageFileDefinition.createFileFromDeck(appState.deck),
            {
                fileName: "deck",
                mimeTypes: [jsonStorageFileDefinition.mimeType],
                description: "Save Excalideck file",
                id: "Excalideck",
                extensions: [jsonStorageFileDefinition.extension],
                excludeAcceptAllOption: true,
            },
            appState.openFileHandle ?? null
        );
        setAppState((latestAppState) => ({
            ...latestAppState,
            openFileHandle: handle,
            persistenceState: {
                ...latestAppState.persistenceState!,
                storageName: handle!.name,
                status: PersistenceStateStatus.AllChangesSaved,
            },
        }));
    }

    return {
        deck: appState.deck,
        persistenceState: appState.persistenceState,
        openFile,
        saveFile,
        updateDeck,
    };
}
