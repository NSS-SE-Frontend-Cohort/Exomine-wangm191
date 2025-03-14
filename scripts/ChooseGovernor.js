import { setColonyId, setGovernorId } from "./TransientState.js"

export const handleGovernorChange = (changeEvent, governors) => {
    // Check if the event target is the one we care about
    if (changeEvent.target && changeEvent.target.id === "governors") {
        const governorId = changeEvent.target.value;

        // Find the selected governor from the list of governors
        const selectedGovernor = governors.find(governor => governor.id === governorId);

        // If a governor is found, set the state
        if (selectedGovernor) {
            setGovernorId(selectedGovernor.id)
            setColonyId(selectedGovernor.colonyId)
        }
    }
}


export const ChooseGovernor = async () => {
    const response = await fetch("http://localhost:8088/governors")
    const governors = await response.json()

    document.addEventListener('change', (changeEvent) => handleGovernorChange(changeEvent, governors));

    let governorHTML = "<div>Choose a governor</div>"
    governorHTML += "<select id='governors'>"
    governorHTML += "<option value='' disabled selected hidden>Select Governor</option>"
    

    const governorChoices = governors.map(governor => {
        return `<option value="${governor.id}" ${governor.active ? '' : "disabled"}>${governor.name}</option>`
    }).join("")

    governorHTML += governorChoices
    governorHTML += "</select>"
    return governorHTML
}