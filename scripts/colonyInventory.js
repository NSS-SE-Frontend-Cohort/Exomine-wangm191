export const getColonyInventory = async (id) => {
    const response = await fetch(`http://localhost:8088/colonyInventory?colonyId=${id}`)
    const inventory = await response.json()

    return inventory
}

export const displayColonyInventory = async (id) => {
    debugger
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
            name: mineral ? mineral.name : null
        }
    })

    const colony = colonies.find(colony => String(colony.id) === String(id))

    let colonyHTML = colony ? `<h2>${colony.colonyName} Inventory</h2>` : "<h2>Colony Inventory</h2>"

    const colonyMinerals = new Map()

    expandedInventory.forEach(item => {
        if (colonyMinerals.has(item.name)) {
            colonyMinerals.set(item.name, colonyMinerals.get(item.name) + item.quantity)
        } else {
            colonyMinerals.set(item.name, item.quantity)
        }
    })

    const mineralHTML = Array.from(colonyMinerals).map(([name, quantity]) => {
        return `<div ${quantity === 0 ? "disabled" : ""}>${quantity} tones of ${name}</div>`
    }).join("")

    colonyHTML += mineralHTML

    return colonyHTML
}