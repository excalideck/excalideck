import {
    fileOpen,
    fileSave,
    FileSystemHandle,
} from "@dwelle/browser-fs-access";
import { Deck } from "@excalideck/deck";
import { FileSavingState } from "@excalideck/excalideck-editor";
import ExcalideckFile from "@excalideck/excalideck-file";
import { nanoid } from "nanoid";
import { useCallback, useState } from "react";
import LocalDeck from "../LocalDeck";
import isAbortError from "../utils/isAbortError";

interface PersistentExcalideckEditorState {
    fileSavingState: FileSavingState;
    openFileHandle: FileSystemHandle | null;
    deck: Deck;
    excalideckEditorKey: string;
}

export default function usePersistentExcalideckEditorState(
    initialDeck: Deck,
    saveToLocalStorage: boolean
) {
    const [
        persistentExcalideckEditorState,
        setPersistentExcalideckEditorState,
    ] = useState<PersistentExcalideckEditorState>({
        fileSavingState: null,
        openFileHandle: null,
        deck: saveToLocalStorage ? LocalDeck.get() ?? initialDeck : initialDeck,
        excalideckEditorKey: nanoid(),
    });

    async function loadFromFile() {
        try {
            const file = await fileOpen({
                extensions: [ExcalideckFile.extension],
                description: "Load from Excalideck file",
                id: "Excalideck",
            });
            const deck = await ExcalideckFile.getDeckFromFile(file);

            setPersistentExcalideckEditorState({
                deck: deck,
                openFileHandle: file.handle ?? null,
                fileSavingState: file.handle
                    ? {
                          fileName: file.name,
                          isSavingInProgress: false,
                          areAllChangesSaved: true,
                      }
                    : null,
                // Force remount of the ExcalideckEditor component
                excalideckEditorKey: nanoid(),
            });
        } catch (error) {
            if (!isAbortError(error)) {
                console.error(error);
                window.alert("Loading from Excalideck file failed");
            }
        }
    }

    async function saveToFile() {
        try {
            setPersistentExcalideckEditorState({
                ...persistentExcalideckEditorState,
                fileSavingState: persistentExcalideckEditorState.fileSavingState
                    ? {
                          ...persistentExcalideckEditorState.fileSavingState,
                          isSavingInProgress: true,
                      }
                    : null,
            });

            const blob = await ExcalideckFile.getBlobFromDeck(
                persistentExcalideckEditorState.deck
            );
            const fileHandle = await fileSave(
                blob,
                {
                    fileName: "deck.pdf",
                    mimeTypes: [ExcalideckFile.mimeType],
                    description: "Save to Excalideck file",
                    id: "Excalideck",
                    extensions: [ExcalideckFile.extension],
                    excludeAcceptAllOption: true,
                },
                persistentExcalideckEditorState.openFileHandle
            );

            setPersistentExcalideckEditorState(
                (latestPersistentExcalideckEditorState) => ({
                    ...latestPersistentExcalideckEditorState,
                    openFileHandle: fileHandle,
                    fileSavingState: fileHandle
                        ? {
                              fileName: fileHandle.name,
                              isSavingInProgress: false,
                              areAllChangesSaved:
                                  latestPersistentExcalideckEditorState.deck ===
                                  persistentExcalideckEditorState.deck,
                          }
                        : null,
                })
            );
        } catch (error) {
            if (!isAbortError(error)) {
                console.error(error);
                window.alert("Saving to Excalideck file failed");
            }
        }
    }

    const updateDeck = useCallback(
        (deck: Deck) => {
            if (saveToLocalStorage) {
                LocalDeck.set(deck);
            }
            setPersistentExcalideckEditorState(
                (latestPersistentExcalideckEditorState) => ({
                    ...latestPersistentExcalideckEditorState,
                    deck: deck,
                    fileSavingState:
                        latestPersistentExcalideckEditorState.fileSavingState
                            ? {
                                  ...latestPersistentExcalideckEditorState.fileSavingState,
                                  areAllChangesSaved: false,
                              }
                            : null,
                })
            );
        },
        [saveToLocalStorage]
    );

    return {
        deck: persistentExcalideckEditorState.deck,
        fileSavingState: persistentExcalideckEditorState.fileSavingState,
        excalideckEditorKey:
            persistentExcalideckEditorState.excalideckEditorKey,
        loadFromFile,
        saveToFile,
        updateDeck,
    };
}
