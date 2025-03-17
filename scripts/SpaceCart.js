import { getSelectedMinerals } from "./TransientState.js";

export const updateSpaceCart = async () => {
    const mineralsResponse = await fetch("http://localhost:8088/minerals")
    const minerals = await mineralsResponse.json()

    const selectedMinerals = getSelectedMinerals()
    let expandedMinerals = []

    selectedMinerals.forEach((mineralIds, facilityId) => {
        // For each facilityId, loop over the mineralIds array
        mineralIds.forEach(mineralId => {
            const mineral = minerals.find(mineral => String(mineral.id) === String(mineralId))
            
            // Add the expanded mineral details to the array
            expandedMinerals.push({
                facilityId,
                mineralId,
                name: mineral ? mineral.name : null
            })
        })
    })

    let spaceCartHTML = "<h2>Space Cart</h2>"

    const chosenMinerals = expandedMinerals.map(mineral => {
        return `<div>1 tone of ${mineral.name}</div>`
    }).join("")

    spaceCartHTML += chosenMinerals
    return spaceCartHTML
}


