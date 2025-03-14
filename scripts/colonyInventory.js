export const displayColonyInventory = async (id) => {
    const response = await fetch(`http://localhost:8088/colonyInventory?colonyId=${id}`)
    const inventory = await response.json()

    const mineralsResponse = await fetch("http://localhost:8088/minerals")
    const minerals = await mineralsResponse.json()

    const coloniesResponse = await fetch("http://localhost:8088/colonies")
    const colonies = await coloniesResponse.json()

    const expandedInventory = inventory.map(item => {
        const mineral = minerals.find(mineral => String(mineral.id) === String(item.mineralId))

        return {
            ...item,
            mineral: mineral ? mineral.name : null
        }
    })

    const colony = colonies.find(colony => String(colony.id) === String(id))

    let colonyHTML = colony ? `<h2>${colony.colonyName} Inventory</h2>` : "<h2>Colony Inventory</h2>"

    const colonyMinerals = expandedInventory.map(item => {
        return `<div ${item.quanity === 0 ? "disabled" : ""}>${item.quanity} tones of ${item.mineral}</div>`
    }).join("")

    colonyHTML += colonyMinerals
    
    return colonyHTML
}