import clsx from "clsx";
import PersistenceState from "../../entities/PersistenceState";
import PersistenceStateStatus from "../../entities/PersistenceStateStatus";
import "./index.css";

interface Props {
    persistenceState: PersistenceState;
}
export default function PersistenceStateIndicator({ persistenceState }: Props) {
    return persistenceState ? (
        <div className="PersistenceStateIndicator">
            <div
                className={clsx(
                    "StatusDot",
                    PersistenceStateStatus[persistenceState.status]
                )}
                title={getPersistenceStateStatusDotTitle(
                    persistenceState.status
                )}
            >
                {"•"}
            </div>
            <div className="StorageName">
                <label>{"Saving to"}</label>
                <div title={persistenceState.storageName}>
                    {persistenceState.storageName}
                </div>
            </div>
        </div>
    ) : null;
}

function getPersistenceStateStatusDotTitle(status: PersistenceStateStatus) {
    switch (status) {
        case PersistenceStateStatus.AllChangesSaved:
            return "All changes saved";
        case PersistenceStateStatus.SomeUnsavedChanges:
            return "Unsaved changes";
        case PersistenceStateStatus.SavingChanges:
            return "Saving changes";
        case PersistenceStateStatus.ErrorSavingChanges:
            return "Error saving changes";
    }
}
