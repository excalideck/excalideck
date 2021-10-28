import { ExcalidrawElement, Hash, PrintableArea } from "@excalideck/deck";
import Excalidraw from "@excalidraw/excalidraw";
import { ImportedDataState } from "@excalidraw/excalidraw/types/data/types";
import { UIOptions } from "@excalidraw/excalidraw/types/types";
import { cloneDeep, debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import PrintableAreaUtils from "../../utils/PrintableAreaUtils";
import "./index.css";

// # Notes on the Excalidraw component
//
// The Excalidraw component is uncontrolled, so changing the
// `Excalidraw.initialData` prop doesn't affect the component and will not
// trigger a re-render.
//
// On the other hand, changing the `Excalidraw.onChange` prop _does_ trigger a
// re-render, and every time the component renders, it fires a change event
// (i.e. it calls the `Excalidraw.onChange` prop). This means that we need to
// avoid changing the `Excalidraw.onChange` prop after every change event, else
// we get an infinite render loop. Hence the use of `useCallback`.
//
// The Excalidraw component fires change events whenever either its `elements`
// or its `appState` change. This means that:
//
// - we only need to call `ExcalidrawElementsInput.onChange` when the `elements`
//   have changed, hence the (hash) equality check
//
// - while the user is interacting with the component, change events are fired
//   every few milliseconds. We therefore `debounce` the callback to avoid
//   performing expensive computations on every little change
//
// The Excalidraw component mutates its element objects. This means that:
//
// - we need to make a copy of the elements before passing them to / taking them
//   from outer components, to give outer components the guarantee that:
//
//   - the coming-in `ExcalidrawElementsInput.initialValue` prop will not be
//     mutated
//
//   - given two calls to the `ExcalidrawElementsInput.onChange` prop, the two
//     going-out `newValue` arguments won't be strictly-equal if they are
//     "functionally different"
//
// - when comparing elements passed to the `Excalidraw.onChange` callback, we
//   can't use strict-equality, hence the use of a hashing function
//
// # Notes on the ExcalidrawElementsInput component
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
}
/**
 * ### Uncontrolled component warning
 *
 * The `initialValue` prop is only used on first render. Changing it afterwards,
 * while allowed, does not affect the component and does not trigger a
 * re-render. If you need the component to re-render with a new `initialValue`,
 * destroy and re-create it (e.g. changing its `key`).
 *
 * On the other hand, changing the `onChange` prop does trigger a re-render, so
 * keep it stable.
 */
export default function ExcalidrawElementsInput({
    printableArea,
    initialValue,
    onChange,
}: Props) {
    const [currentElements, setCurrentElements] = useState(() =>
        cloneDeep(initialValue)
    );

    const debouncedOnChangeCallback = debounce(
        (possiblyChangedElements: ExcalidrawElement[]) => {
            if (
                Hash.excalidrawElements(possiblyChangedElements) !==
                Hash.excalidrawElements(currentElements)
            ) {
                const changedElements = cloneDeep(possiblyChangedElements);
                unstable_batchedUpdates(() => {
                    setCurrentElements(changedElements);
                    onChange(changedElements);
                });
            }
        },
        100
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onChangeCallback = useCallback(debouncedOnChangeCallback, [
        currentElements,
        onChange,
    ]);
    useEffect(
        () => () => debouncedOnChangeCallback.cancel(),
        [debouncedOnChangeCallback]
    );

    const initialData: ImportedDataState = useMemo(
        () => ({
            elements: currentElements as any,
            appState: {
                zoom: PrintableAreaUtils.getFittingZoom(printableArea),
            },
        }),
        // Passing undefined, as we don't care about updating the zoom when
        // printableArea changes (when it changes, the component will be
        // re-mounted)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        undefined
    );

    const uiOptions: UIOptions = useMemo(
        () => ({
            canvasActions: {
                changeViewBackgroundColor: true,
                theme: true,
                clearCanvas: false,
                export: false,
                loadScene: false,
                saveAsImage: false,
                saveToActiveFile: false,
            },
        }),
        []
    );
    return (
        <div className="ExcalidrawElementsInput">
            <Excalidraw
                initialData={initialData}
                onChange={onChangeCallback as any}
                UIOptions={uiOptions}
            />
        </div>
    );
}
