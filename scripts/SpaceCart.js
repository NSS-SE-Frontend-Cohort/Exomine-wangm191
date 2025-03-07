import { getSelectedMinerals } from "./TransientState.js";

export const fetchSelectedMinerals = async (selectedMineralsArray) => {
    const ids = selectedMineralsArray.join(',')
    const response = await fetch(`http://localhost:8088/minerals?id=${ids}`))
    const selectedMinerals = response.json()
    
    return selectedMinerals.length ? minerals : []
}

export const updateSpaceCart = async () => {

    const selectedMinerals = await fetchSelectedMinerals(getSelectedMinerals()) 

    const spaceCartHTML = "<h2>Space Cart</h2>"

    const chosenMinerals = selectedMinerals.map(mineral => {
        return `<div>1 tone of ${mineral.type}</div>`
    }) 

    spaceCartHTML += chosenMinerals.join("")
    return spaceCartHTML
}

