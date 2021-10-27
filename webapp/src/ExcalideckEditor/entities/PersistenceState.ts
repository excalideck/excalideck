import PersistenceStateStatus from "./PersistenceStateStatus";

type PersistenceState = {
    storageName: string;
    status: PersistenceStateStatus;
    savingError: Error | null;
} | null;
export default PersistenceState;
