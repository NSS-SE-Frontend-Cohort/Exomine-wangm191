const state = {
    governorId: "0",
    colonyId: "0",
    facilityId: "0",
    selectedMinerals: []
}

export const setGovernorId = (governorIdChange) => {
    state.governorId = governorIdChange
    console.log(state)
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setColonyId = (colonyIdChange) => {
    state.colonyId = colonyIdChange
    console.log(state)
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setFacilityId = (facilityIdChange) => {
    state.facilityId = facilityIdChange
    console.log(state)
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setSelectedMinerals = (mineralId, selected) => {
    if (selected) {
        if (!state.selectedMinerals.includes(mineralId)) {
            state.selectedMinerals.push(mineralId);
        }
    } else {
        const index = state.selectedMinerals.indexOf(mineralId);
        if (index !== -1) {
            state.selectedMinerals.splice(index, 1);
        }
    }

    console.log(state);
    document.dispatchEvent(new CustomEvent("stateChanged"));
};


export const getSelectedMinerals = () => {
    return state.selectedMinerals
}

export const getTransientState = () => ({ ...state })

export const resetState = () => {
    state.governorId = "0"
    state.colonyId = "0"
    state.facilityId = "0"
    state.selectedMinerals = new Map()
    console.log(state)
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const purchaseMineral = () => {
    /*
        Does the chosen governor's colony already own some of this mineral?
            - If yes, what should happen?
            - If no, what should happen?

        Defining the algorithm for this method is traditionally the hardest
        task for teams during this group project. It will determine when you
        should use the method of POST, and when you should use PUT.

        Only the foolhardy try to solve this problem with code.
    */



    document.dispatchEvent(new CustomEvent("stateChanged"))
}
