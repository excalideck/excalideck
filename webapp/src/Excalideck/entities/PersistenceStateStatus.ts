enum PersistenceStateStatus {
    // All changes were saved, so no changes are being saved and there was no
    // error saving the last changes
    AllChangesSaved,
    // There are some unsaved changes, which are not being saved, and there was
    // no error saving the last changes
    SomeUnsavedChanges,
    // There are some unsaved changes, which are not being saved, and there was
    // an error saving the last changes
    ErrorSavingChanges,
    // There are some unsaved changes, which are being saved. The saving operation
    // is still in progress so there is no saving error
    SavingChanges,
}
export default PersistenceStateStatus;
