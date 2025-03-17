import { dispatchTransientState } from "../events/events.js"
import { getColonyInventory } from "./colonyInventory.js"
import { getAllFacilities } from "./facilityInventory.js"

const state = {
    governorId: "0",
    colonyId: "0",
    selectedMinerals: new Map()
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
    console.log(facilityIdChange)
    dispatchTransientState("facilityId", facilityIdChange)
}

export const setSelectedMinerals = (facilityId, mineralId, selected) => {
    // If the facilityId does not exist in the map, initialize it with an empty Set
    if (!state.selectedMinerals.has(String(facilityId))) {
        state.selectedMinerals.set(String(facilityId), new Set());
    }

    const facilitySelectedMinerals = state.selectedMinerals.get(facilityId);

    if (selected) {
        // Add mineralId to the Set (it automatically ensures no duplicates)
        facilitySelectedMinerals.add(mineralId)
    } else {
        // Remove mineralId from the Set
        facilitySelectedMinerals.delete(mineralId)
    }

    dispatchTransientState("spaceCart");
};

export const getTransientState = () => state

export const getSelectedMinerals = () => {
    return state.selectedMinerals
}

export const getSelectedMineralsFromFacility = (facilityId) => {
    // If the facilityId exists, return the minerals
    if (state.selectedMinerals.has(String(facilityId))) {
        return Array.from(state.selectedMinerals.get(String(facilityId)));
    }
    // If facilityId is not found, return an empty array
    console.log('No minerals found for this facilityId');
    return [];
};

export const resetState = () => {
    state.governorId = "0"
    state.colonyId = "0"
    state.selectedMinerals = new Map()
    console.log(state)
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
    const selectedMinerals = getSelectedMinerals()

    const colonyInventory = await getColonyInventory(state.colonyId)

    const allFacilities = await getAllFacilities()

    await Promise.all(allFacilities.map(async (facility) => {
        // Check if the facilityId exists in selectedMinerals map
        if (selectedMinerals.has(String(facility.facilityId))) {
            const selectedMineralsForFacility = selectedMinerals.get(String(facility.facilityId))
    
            // Check if the mineralId is in the set of selected minerals for that facility
            const isSelected = selectedMineralsForFacility.has(facility.mineralId);
    
            if (isSelected && facility.quantity > 0) {
                const updateFacilityMineral = {
                    ...facility,
                    quantity: facility.quantity - 1
                };
                console.log("Updated Facility Minerals", updateFacilityMineral);
    
                await fetch(`http://localhost:8088/facilityInventory/${facility.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                       body: JSON.stringify(updateFacilityMineral)
                })
            } else {
                   console.log("No more minerals in facility, quantity is at 0");
            }
        }
    }))

    await Promise.all(Array.from(selectedMinerals).map(async ([facilityId, mineralIds]) => {
        // Loop through each mineralId for the current facilityId
        await Promise.all(Array.from(mineralIds).map(async (mineralId) => {
            // Check if the combination of facilityId and mineralId already exists in colonyInventory
            const existingItem = colonyInventory.find(item => item.governorId === state.governorId && item.facilityId === facilityId && item.mineralId === mineralId)
    
            if (existingItem) {
                if (existingItem.quantity > 0) {
                    const updatedColonyMineral = {
                        ...existingItem,
                        quantity: existingItem.quantity + 1 
                    };
    
                    await fetch(`http://localhost:8088/colonyInventory/${existingItem.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(updatedColonyMineral)
                    })
    
                    console.log("Updated Colony Mineral:", updatedColonyMineral)
                }
            } else {
                // If it doesn't exist, create a new colony inventory entry
                const newColonyMineral = {
                    governorId: state.governorId,
                    colonyId: state.colonyId,
                    facilityId: facilityId, 
                    mineralId: mineralId,
                    quantity: 1 
                };
    
                await fetch(`http://localhost:8088/colonyInventory`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newColonyMineral)
                })
    
                console.log("New Colony Mineral:", newColonyMineral)
                console.log("New Mineral added to Colony Inventory")
            }
        }))
    }))
    
    resetState()

    document.dispatchEvent(new CustomEvent("purchasedMinerals"))
}
