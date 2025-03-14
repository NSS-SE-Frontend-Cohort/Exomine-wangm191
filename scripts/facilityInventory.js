import { setSelectedMinerals, getTransientState } from "./TransientState.js"

export const handleSelectedMinerals = (changeEvent) => {
    if (changeEvent.target && changeEvent.target.name === "minerals"){
        const { value, checked } = changeEvent.target

        if (value) {
            if (checked) {
                setSelectedMinerals(value, true) 
            } else {
                setSelectedMinerals(value, false)
            }
        }
    }
};

export const getFacilityInventory = async (id) => {
    const response = await fetch(`http://localhost:8088/facilityInventory?facilityId=${id}`)
    const inventory = await response.json()

    return inventory
}


export const displayFacilityInventory = async (id) => {
    // Fetch facility inventory data
    const response = await fetch(`http://localhost:8088/facilityInventory?facilityId=${id}`)
    const inventory = await response.json()

    // Fetch the full minerals list
    const mineralsResponse = await fetch("http://localhost:8088/minerals")
    const minerals = await mineralsResponse.json()

    // Fetch the full facilities list (to get the facility name)
    const facilitiesResponse = await fetch("http://localhost:8088/facilities")
    const facilities = await facilitiesResponse.json()

    const state = getTransientState()

    document.addEventListener('change', handleSelectedMinerals);

    // Expand the mineral data by matching mineralId from facilityInventory to minerals array
    const expandedInventory = inventory.map(item => {
        const mineral = minerals.find(mineral => String(mineral.id) === String(item.mineralId))

        return {
            ...item,
            mineral: mineral ? mineral.name : null
        }
    })

    // Get the facility name from the facilities data
    const facility = facilities.find(facility => String(facility.id) === String(id))

    let facilityHTML = facility ? `<h2>Facility Minerals from ${facility.facilityName}</h2>` : "<h2>Facility Minerals</h2>"

    // Get the current selected minerals from the global state (selectedMinerals)
    const selectedMinerals = state.selectedMinerals

    // Map over expanded inventory and create checkboxes for each mineral
    const facilityMinerals = expandedInventory.map(item => {
        // Check if the mineral is selected globally (independent of facility)
        const isSelected = selectedMinerals.includes(item.mineralId) ? 'checked' : ''
    
        return `
            <div>
                <input type="checkbox" name="minerals" value="${item.mineralId}" 
                    ${item.quantity === 0 ? "disabled" : ""} ${isSelected}>
                ${item.quantity} tones of ${item.mineral}
            </div>
        `
    }).join("")
    

    facilityHTML += facilityMinerals

    return facilityHTML
}







