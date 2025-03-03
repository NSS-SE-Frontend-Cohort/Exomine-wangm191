export const handleGovernorChange = (changeEvent) => {
    if (changeEvent.target.id === 'governors') {
        setGovernorChange(JSON.parse(changeEvent.target.value))
    }
}

export const ChooseGovernor = async () => {
    const response = await fetch("http://localhost:8088/governors")
    const governors = response.json()

    document.addEventListener('change', handleGovernorChange)

    let governorHTML = "<div>Choose a governor</div>"
    governorHTML += "'<select id='governors'>"
    governorHTML += "<option value='0'>Select governor</option>"
    

    const governorChoices = governors.map(governor => {
        return `<option value=${governor.id}>${governor.name}</option>`
    }) 

    governorHTML += governorChoices.join('')
    governorHTML += "<select/>"
    return governorHTML
}