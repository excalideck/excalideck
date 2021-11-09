import { ExcalidrawElement, Hash, PrintableArea } from "@excalideck/deck";
import Excalidraw from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { cloneDeep } from "lodash";
import { useEffect, useMemo, useRef } from "react";
import Library from "../../entities/Library";
import PrintableAreaUtils from "../../utils/PrintableAreaUtils";
import "./index.css";

// # Notes on the Excalidraw component
//
// 1. the Excalidraw component is uncontrolled, so changing the
//    `Excalidraw.initialData` prop doesn't affect the component and will not
//    trigger a re-render
//
// 2. on the other hand, changing the `Excalidraw.onChange` prop _does_ trigger
//    a re-render, and every time the component renders, it fires a change event
//    (i.e. it calls the `Excalidraw.onChange` prop). This makes using the prop
//    a bit tricky: if we don't memoize the `Excalidraw.onChange` prop and
//    change it after every change event, we get an infinite render loop
//
// 3. the Excalidraw component fires change events whenever either its
//    `elements` or its `appState` change. This means that:
//
//   - if we're only interested in changes to `elements`, in the body of the
//     `Excalidraw.onChange` callback we need to figure out if they actually did
//     change (this is made more difficult by the fact that the `elements` array
//     gets mutated, so we can't use a simple strict-equality check)
//
//   - while the user is interacting with the component, change events are fired
//     every few milliseconds. Hence, the `Excalidraw.onChange` callback
//     probably needs to be debounced, to avoid performing too many expensive
//     computations and slowing down the app
//
// 4. the Excalidraw component mutates its element objects. This means that:
//
//   - we need to make a copy of the elements before passing-them-to /
//     taking-them-from outer components, to give outer components the guarantee
//     that:
//
//     - the coming-in `ExcalidrawElementsInput.initialValue` prop will not be
//       mutated
//
//     - given two calls to the `ExcalidrawElementsInput.onChange` prop, the two
//       going-out `newValue` arguments won't be strictly-equal if they are
//       "functionally different"
//
//   - when comparing elements gotten from
//     `Excalidraw.getSceneElementsIncludingDeleted`, we can't use a simple
//     strict-equality check (hence the use of a hashing function)
//
// # Notes on the ExcalidrawElementsInput component
//
// Given the difficulties (points 2. and 3. above) of using
// `Excalidraw.onChange`, to get changes out of the Excalidraw component we
// opted for a polling approach.
//
// As documented below, users of the ExcalidrawElementsInput component that want
// changes to the `ExcalidrawElementsInput.initialValue` prop to be reflected in
// the input must re-mount the component (by changing its `key`).
//
// Setting this requirement allows for a simpler implementation of the
// ExcalidrawElementsInput component. One alternative (that we might use in the
// future) could be to monitor "functional changes" to the `initialValue` prop,
// and - in response - call the `Excalidraw.updateScene` imperative API.
//
// One of the disadvantages of this approach is losing the undo/redo history of
// a slide's drawing board when changing slides. TODO: expose an API to
// keep-track-of and restore the undo/redo history.

interface Props {
    printableArea: PrintableArea;
    initialValue: ExcalidrawElement[];
    onChange: (newValue: ExcalidrawElement[]) => void;
    initialLibrary: Library;
    onLibraryChange: (newLibrary: Library) => void;
}
/**
 * ### Uncontrolled component warning
 *
 * The `initialValue` prop is only used on first render. Changing it afterwards,
 * while allowed, does not affect the component and does not trigger a
 * re-render. If you need the component to re-render with a new `initialValue`,
 * destroy and re-create it (e.g. changing its `key`).
 */
export default function ExcalidrawElementsInput({
    printableArea,
    initialValue,
    onChange,
    initialLibrary,
    onLibraryChange,
}: Props) {
    const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null);

    const initialData = useMemo(
        () => ({
            elements: cloneDeep(initialValue as any),
            appState: {
                zoom: PrintableAreaUtils.getFittingZoom(printableArea),
            },
            libraryItems: initialLibrary as any,
        }),
        // As stated above, we ignore changes to `initialValue`
        // eslint-disable-next-line react-hooks/exhaustive-deps
        undefined
    );

    const initialHash = useMemo(
        () => Hash.excalidrawElements(initialValue),
        // As stated above, we ignore changes to `initialValue`
        // eslint-disable-next-line react-hooks/exhaustive-deps
        undefined
    );
    const previousHashRef = useRef<number>(initialHash);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!excalidrawRef.current) {
                return;
            }
            const currentElements =
                excalidrawRef.current.getSceneElementsIncludingDeleted();
            const currentHash = Hash.excalidrawElements(currentElements as any);
            if (currentHash !== previousHashRef.current) {
                previousHashRef.current = currentHash;
                onChange(cloneDeep(currentElements as any));
            }
        }, 100);
        return () => clearInterval(intervalId);
    }, [onChange]);

    return (
        <div className="ExcalidrawElementsInput">
            <Excalidraw
                ref={excalidrawRef}
                initialData={initialData}
                viewModeEnabled={false}
                onLibraryChange={onLibraryChange as any}
                UIOptions={{
                    canvasActions: {
                        changeViewBackgroundColor: true,
                        theme: true,
                        clearCanvas: false,
                        export: false,
                        loadScene: false,
                        saveAsImage: false,
                        saveToActiveFile: false,
                    },
                }}
            />
        </div>
    );
}
