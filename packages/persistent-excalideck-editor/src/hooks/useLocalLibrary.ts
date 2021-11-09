import LocalLibrary from "../LocalLibrary";

export default function useLocalLibrary(saveToLocalStorage: boolean) {
    return {
        library: LocalLibrary.get() ?? [],
        onLibraryChange: saveToLocalStorage
            ? LocalLibrary.set
            : // no-op
              () => void 0,
    };
}
