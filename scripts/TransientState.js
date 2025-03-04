const state = {
    governorId: "0",
    colonyId: "0",
    facilityId: "0",
    mineralId: "0"
}

export const setGovernorId = (governorIdChange) => {
    state.governorId = governorIdChange
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setColonyId = (colonyIdChange) => {
    state.colonyId = colonyIdChange
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setFacilityId = (facilityIdChange) => {
    state.facilityId = facilityIdChange
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setMineralId = (mineralIdChange) => {
    state.mineralId = mineralIdChange
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
