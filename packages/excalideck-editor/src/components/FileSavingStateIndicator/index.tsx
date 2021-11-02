import clsx from "clsx";
import FileSavingState from "../../entities/FileSavingState";
import "./index.css";

interface Props {
    fileSavingState: FileSavingState;
}
export default function FileSavingStateIndicator({ fileSavingState }: Props) {
    return fileSavingState ? (
        <div className="FileSavingStateIndicator">
            <div
                className={clsx("Dot", getDotClass(fileSavingState))}
                title={getDotTitle(fileSavingState)}
            >
                {"•"}
            </div>
            <div className="FileName">
                <label>{"Saving to"}</label>
                <div title={fileSavingState.fileName}>
                    {fileSavingState.fileName}
                </div>
            </div>
        </div>
    ) : null;
}

function getDotTitle(fileSavingState: NonNullable<FileSavingState>) {
    return fileSavingState.isSavingInProgress
        ? "Saving changes..."
        : fileSavingState.areAllChangesSaved
        ? "All changes saved"
        : "Unsaved changes";
}

function getDotClass(fileSavingState: NonNullable<FileSavingState>) {
    return fileSavingState.isSavingInProgress
        ? "SavingChanges"
        : fileSavingState.areAllChangesSaved
        ? "AllChangesSaved"
        : "UnsavedChanges";
}
