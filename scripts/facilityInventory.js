import { setSelectedMinerals, getTransientState, getSelectedMinerals, getSelectedMineralsFromFacility } from "./TransientState.js"

export const handleSelectedMinerals = (changeEvent) => {
    if (changeEvent.target && changeEvent.target.name === "minerals") {
        const { value, checked } = changeEvent.target
        const facilityId = changeEvent.target.dataset.facilityId // Use data-attribute to get facilityId

        if (facilityId && value) {
            const mineralId = value;
            setSelectedMinerals(facilityId, mineralId, checked)
        }
    }
};

export const displayFacilityInventory = async (id) => {
    // Fetch facility inventory data
    const response = await fetch(`http://localhost:8088/facilityInventory?facilityId=${id}`)
    const inventory = await response.json();

    // Fetch the full minerals list
    const mineralsResponse = await fetch("http://localhost:8088/minerals")
    const minerals = await mineralsResponse.json();

    // Fetch the full facilities list (to get the facility name)
    const facilitiesResponse = await fetch("http://localhost:8088/facilities")
    const facilities = await facilitiesResponse.json();

    document.addEventListener('change', handleSelectedMinerals)

    // Expand the mineral data by matching mineralId from facilityInventory to minerals array
    const expandedInventory = inventory.map(item => {
        const mineral = minerals.find(mineral => String(mineral.id) === String(item.mineralId))

        return {
            ...item,
            name: mineral ? mineral.name : null
        };
    });

    // Get the facility name from the facilities data
    const facility = facilities.find(facility => String(facility.id) === String(id))

    let facilityHTML = facility ? `<h2>Facility Minerals from ${facility.facilityName}</h2>` : "<h2>Facility Minerals</h2>"

    const state = getTransientState()
    console.log(state)
    // Get the current selected minerals from the global state (selectedMinerals)
    const selectedMinerals = getSelectedMineralsFromFacility(id)

    // Map over expanded inventory and create checkboxes for each mineral
    const facilityMinerals = expandedInventory.map(item => {
        // Check if the mineral is selected for this specific facility
        const isSelected = selectedMinerals.includes(item.mineralId) ? 'checked' : ''

        return `
            <div class="minerals__inventory">
                <input type="checkbox" name="minerals" value="${item.mineralId}" 
                    ${item.quantity === 0 ? "disabled" : ""} ${isSelected} 
                    data-facility-id="${id}">
                ${item.quantity} tones of ${item.name}
            </div>
        `;
    }).join("")

    facilityHTML += facilityMinerals

    return facilityHTML
};

export const getFacilityInventory = async (id) => {
    const response = await fetch(`http://localhost:8088/facilityInventory?facilityId=${id}`)
    const inventory = await response.json()

    return inventory
}

export const getAllFacilities = async () => {
    const response = await fetch("http://localhost:8088/facilityInventory")
    const inventory = await response.json()

    return inventory
}



