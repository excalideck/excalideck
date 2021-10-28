import PersistenceStateStatus from "./PersistenceStateStatus";

type PersistenceState = {
    readonly storageName: string;
    readonly status: PersistenceStateStatus;
    readonly savingError: Error | null;
} | null;
export default PersistenceState;
