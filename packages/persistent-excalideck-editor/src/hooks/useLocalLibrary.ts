import LocalLibrary from "../LocalLibrary";

export default function useLocalLibrary() {
    return {
        library: LocalLibrary.get() ?? [],
        onLibraryChange: LocalLibrary.set,
    };
}
