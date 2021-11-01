/**
 * When FileSavingState is null, the Deck is **not** being saved to a file.
 * Conversely, when FileSavingState is **not** null, the Deck is being saved to
 * a file
 */
type FileSavingState = {
    /** The name of the file the Deck is being saved to */
    fileName: string;
    /** True if the saving operation is currently in progress */
    isSavingInProgress: boolean;
    /** True if all changes to the Deck have been saved to the file */
    areAllChangesSaved: boolean;
} | null;
export default FileSavingState;
