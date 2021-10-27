import { faFolderOpen, faSave } from "@fortawesome/free-solid-svg-icons";
import PersistenceState from "../../entities/PersistenceState";
import PersistenceStateStatus from "../../entities/PersistenceStateStatus";
import IconButton from "../IconButton";
import PersistenceStateIndicator from "../PersistenceStateIndicator";
import "./index.css";

interface Props {
    persistenceState: PersistenceState;
    onOpen: () => void;
    onSave: () => void;
}
export default function PersistenceControl({
    persistenceState,
    onOpen,
    onSave,
}: Props) {
    return (
        <div className="PersistenceControl">
            <IconButton
                title="Open"
                icon={faFolderOpen}
                onClick={() => {
                    if (
                        !persistenceState ||
                        ![
                            PersistenceStateStatus.SomeUnsavedChanges,
                            PersistenceStateStatus.ErrorSavingChanges,
                        ].includes(persistenceState.status) ||
                        // TODO: also show the warning when working on a
                        // non-empty, non-persisted deck
                        window.confirm(
                            "There are some unsaved changes. Opening a new file will discard them. Continue?"
                        )
                    ) {
                        onOpen();
                    }
                }}
            />
            <IconButton
                title="Save"
                disabled={
                    !!persistenceState &&
                    [
                        PersistenceStateStatus.AllChangesSaved,
                        PersistenceStateStatus.SavingChanges,
                    ].includes(persistenceState.status)
                }
                icon={faSave}
                onClick={onSave}
            />
            <PersistenceStateIndicator persistenceState={persistenceState} />
        </div>
    );
}
