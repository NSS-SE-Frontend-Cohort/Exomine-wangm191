import { dispatchTransientState } from "../events/events.js"
import { getColonyInventory } from "./colonyInventory.js"
import { getFacilityInventory } from "./facilityInventory.js"

const state = {
    governorId: "0",
    colonyId: "0",
    facilityId: "0",
    selectedMinerals: []
}

export const setGovernorId = (governorIdChange) => {
    state.governorId = governorIdChange
    console.log(state)
}

export const setColonyId = (colonyIdChange) => {
    state.colonyId = colonyIdChange
    console.log(state)
    dispatchTransientState("colonyId", colonyIdChange)
}

export const setFacilityId = (facilityIdChange) => {
    state.facilityId = facilityIdChange
    console.log(state)
    dispatchTransientState("facilityId", facilityIdChange)
}

export const setSelectedMinerals = (mineralId, selected) => {
    // If mineral is being selected, add to the selected list
    if (selected) {
        if (!state.selectedMinerals.includes(mineralId)) {
            state.selectedMinerals.push(mineralId) // Add the mineralId to selected list
        }
    } else {
        // If mineral is being deselected, remove from the selected list
        const index = state.selectedMinerals.indexOf(mineralId)
        if (index !== -1) {
            state.selectedMinerals.splice(index, 1)
        }
    }

    console.log(state); // For debugging (you should see the global selected minerals)

    // Dispatch state change to other parts of the application (e.g., cart, etc.)
    dispatchTransientState("spaceCart")
}

export const getTransientState = () => state

export const getSelectedMinerals = () => {
    return state.selectedMinerals
}

export const resetState = () => {
    state.governorId = "0"
    state.colonyId = "0"
    state.facilityId = "0"
    state.selectedMinerals = new Map()
    console.log(state)
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const purchaseMineral = async () => {
    /*
        Does the chosen governor's colony already own some of this mineral?
            - If yes, what should happen?
            - If no, what should happen?

        Defining the algorithm for this method is traditionally the hardest
        task for teams during this group project. It will determine when you
        should use the method of POST, and when you should use PUT.

        Only the foolhardy try to solve this problem with code.
    */

    debugger
    const state = getTransientState()

    const selectedMinerals = state.selectedMinerals

    const colonyInventory = await getColonyInventory(state.colonyId)

    const facilityInventory = await getFacilityInventory(state.facilityId)

    // Assuming facilityInventory is the array provided
    await Promise.all(facilityInventory.map(async (item) => {
        const isSelected = selectedMinerals.includes(item.mineralId); // Check if the mineral is selected

        if (isSelected && item.quantity > 0) {  // Ensure quantity is greater than 0
            const updateFacilityMineral = {
                ...item,
                quantity: item.quantity - 1 // Decrease quantity by 1
            };
            console.log(updateFacilityMineral)

            // // Use item.id to update the correct inventory entry
            // await fetch(`http://localhost:8088/facilityInventory/${item.id}`, {
            //     method: "PUT",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(updateFacilityMineral) // Send the updated inventory data
            // });
        }
        else {
            console.log("No more minerals in facility, quantity is at 0")
        }
    }));

    await Promise.all(colonyInventory.map(async (item) => {
        const isSelected = selectedMinerals.includes(item.mineralId)

        if (isSelected && item.quantity > 0) {
            const updateColonyMineral = {
                ...item,
                quantity: item.quantity + 1
            }

            // await fetch(`http://localhost:8088/colonyInventory/${item.id}`, {
            //     method: "PUT",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(updateColonyMineral)
            // });
            console.log(updateColonyMineral)
        }
        else {
            const newColonyMineral = {
                governorId: state.governorId,
                colonyId: state.colonyId,
                facilityId: state.facilityId,
                mineralId: state.mineralId,
                quantity: 1
            }
            console.log(newColonyMineral)
            // await fetch(`http://localhost:8088/colonyInventory`, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(newColonyMineral)
            // });
    
            console.log(`New Mineral added to Colony Inventory`)
        }
    }))

    document.dispatchEvent(new CustomEvent("purchasedMinerals"))
}
