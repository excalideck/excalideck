import { faFolderOpen, faSave } from "@fortawesome/free-solid-svg-icons";
import FileSavingState from "../../entities/FileSavingState";
import FileSavingStateIndicator from "../FileSavingStateIndicator";
import IconButton from "../IconButton";
import "./index.css";

interface Props {
    fileSavingState: FileSavingState;
    onLoadFromFile: () => void;
    onSaveToFile: () => void;
}
export default function FileSavingControl({
    fileSavingState,
    onLoadFromFile,
    onSaveToFile,
}: Props) {
    return (
        <div className="FileSavingControl">
            <IconButton
                title="Load from file"
                icon={faFolderOpen}
                onClick={() => {
                    if (
                        // When the Deck is not being saved to any file, since
                        // loading from a file will discard the current Deck,
                        // ask the user for confirmation
                        (!fileSavingState &&
                            // TODO: only show the warning for non-empty decks
                            window.confirm(
                                "Loading from a file will discard your current deck. Continue?"
                            )) ||
                        // When the Deck is being saved to any file, but there
                        // are unsaved changes, since loading from a file will
                        // discard the current changes, ask the user for
                        // confirmation
                        (!!fileSavingState &&
                            (fileSavingState.areAllChangesSaved ||
                                window.confirm(
                                    "There are some unsaved changes. Loading from a file will discard them. Continue?"
                                )))
                    ) {
                        onLoadFromFile();
                    }
                }}
            />
            <IconButton
                title="Save to file"
                disabled={
                    !!fileSavingState &&
                    (fileSavingState.areAllChangesSaved ||
                        fileSavingState.isSavingInProgress)
                }
                icon={faSave}
                onClick={onSaveToFile}
            />
            <FileSavingStateIndicator fileSavingState={fileSavingState} />
        </div>
    );
}
