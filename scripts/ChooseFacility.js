import { setFacilityId } from "./TransientState.js"

export const handleFacilityChange = (changeEvent) => {
    if (changeEvent.target && changeEvent.target.id === "facilities") {
        setFacilityId(JSON.parse(changeEvent.target.value))
    }
}

export const ChooseFacility = async () => {
    const response = await fetch("http://localhost:8088/facilities")
    const facilities = await response.json()

    document.addEventListener('change', handleFacilityChange)
    
    let facilityHTML = "<div>Choose a facility</div>"
    facilityHTML += "<select id='facilities'>"
    facilityHTML += "<option value='' disabled selected hidden>Select Facility</option>"
        
    
    const facilityChoices = facilities.map(facility => {
        return `<option value="${facility.id}" ${facility.active ? '' : "disabled"}>${facility.facilityName}</option>`
    }).join("")
    
    facilityHTML += facilityChoices
    facilityHTML += "</select>"
    return facilityHTML
}