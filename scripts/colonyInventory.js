export const getColonyInventory = async (id) => {
    const response = await fetch(`http://localhost:8088/colonyInventory?colonyId=${id}&_expand=mineral&_expand=colony`)
    const inventory = await response.json()

    const mineralMap = inventory.reduce((map, item) => {
        const mineralId = item.mineral.id

        if (!map.has(mineralId))
            map.set(mineralId, {type: item.mineral.type, quantity:0})
    
        map.get(mineralId).quantity += item.quantity
        return map;
    }, new Map());

    const colonyName = inventory.find(item => item.colony)?.colonyName || 'Colony'

    const colonyMinerals = [...mineralMap.values()].map(mineral =>{
        `<div>${mineral.quantity} tones of ${mineral.type}</div>`
    })

    const colonyHTML = `<h2>${colonyName} Inventory</h2>`

    colonyHTML += colonyMinerals.join("")

    return colonyHTML;
}