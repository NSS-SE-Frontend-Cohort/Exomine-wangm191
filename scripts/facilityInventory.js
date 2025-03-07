import { setSelectedMinerals } from "./TransientState.js"

export const handleSelectedMinerals = (changeEvent) => {
    const { value, checked } = changeEvent.target;

    if (changeEvent.target && value) {
        setSelectedMinerals(value, checked);
    }
}

export const getFacilityInventory = async (id) => {
    const response = await fetch(`http://localhost:8088/facilityInventory?facilityId=${id}&_expand=mineral&_expand=facility`)
    const inventory = await response.json()

    document.addEventListener('change', handleSelectedMinerals)

    const facilityName = inventory.find(item => item.facility)?.facilityName

    let facilityHTML = `<h2>Facility Minerals from ${facilityName ?? 'Facility Materials'}</h2>`;

    const facilityMinerals = inventory.map(item => {
        return `<div>
            <input type="radio" name="mineral" value="${item.mineralId}" ${item.quantity === 0 ? "disabled" : ""}>${item.quantity} tones of ${item.mineral.type}</input>
        </div>`
    })
    facilityHTML += facilityMinerals.join("")

    return facilityHTML;
}