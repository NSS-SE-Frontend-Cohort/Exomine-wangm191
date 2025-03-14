import { getSelectedMinerals } from "./TransientState.js";

// export const fetchSelectedMinerals = async (selectedMineralsArray) => {
//     const ids = selectedMineralsArray.join(',')
//     const response = await fetch(`http://localhost:8088/minerals?id=${ids}`)
//     const selectedMinerals = await response.json()
    
//     return selectedMinerals.length ? selectedMinerals : []
// }

export const updateSpaceCart = async () => {
    const mineralsResponse = await fetch("http://localhost:8088/minerals")
    const minerals = await mineralsResponse.json()

    const selectedMinerals = getSelectedMinerals()

    console.log(selectedMinerals)

    const expandedMinerals = selectedMinerals.map(item => {
        const mineral = minerals.find(mineral => String(mineral.id) === String(item))

        return {
            ...item,
            name: mineral ? mineral.name : null 
        }
    })

    let spaceCartHTML = "<h2>Space Cart</h2>"

    const chosenMinerals = expandedMinerals.map(mineral => {
        return `<div>1 tone of ${mineral.name}</div>`
    }).join("")

    spaceCartHTML += chosenMinerals
    return spaceCartHTML
}

