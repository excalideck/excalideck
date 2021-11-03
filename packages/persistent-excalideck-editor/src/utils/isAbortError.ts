export default function isAbortError(error: unknown): boolean {
    return (
        error instanceof DOMException && error.code === DOMException.ABORT_ERR
    );
}
