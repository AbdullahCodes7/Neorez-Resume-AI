export const saveToUndoStack = (state) => {
    // Take a deep copy of the current sections
    const snapshot = JSON.parse(JSON.stringify(state.sections));

    // console.log("snapshot", snapshot)

    // Check if redo stack should be cleared
    if (state.undoPointer < state.undoStack.length - 1) {
        state.undoStack = state.undoStack.slice(0, state.undoPointer + 1);
    }

    // Push the new snapshot and update the undo pointer
    state.undoStack.push(snapshot);
    state.undoPointer = state.undoStack.length - 1;

    // console.log("State saved to undo stack.", {
    //     undoPointer: state.undoPointer,
    //     undoStack: state.undoStack,
    // });
};
