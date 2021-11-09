import { Library } from "@excalideck/excalideck-editor";

const LOCAL_STORAGE_ITEM_KEY = "ExcalideckLocalLibrary";

const LocalLibrary = {
    get(): Library | null {
        try {
            const serializedLibrary = localStorage.getItem(
                LOCAL_STORAGE_ITEM_KEY
            );
            return serializedLibrary ? JSON.parse(serializedLibrary) : null;
        } catch {
            // Ignore parsing errors, and just fallback to returning null
            return null;
        }
    },

    set: (library: Library): void => {
        localStorage.setItem(LOCAL_STORAGE_ITEM_KEY, JSON.stringify(library));
    },
};
export default LocalLibrary;
