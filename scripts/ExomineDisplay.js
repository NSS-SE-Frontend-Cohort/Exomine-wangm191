import { eventTypes } from "../events/events.js"
import { displayColonyInventory } from "./colonyInventory.js";
import { displayFacilityInventory  } from "./facilityInventory.js";
import { ChooseFacility } from "./ChooseFacility.js"
import { ChooseGovernor } from "./ChooseGovernor.js"
import { createPurchaseClick } from "./PurchaseMinerals.js"
import { updateSpaceCart } from "./SpaceCart.js"

export const handleExomineListeners = () => {
    document.addEventListener(eventTypes.TRANSIENT_STATE_CHANGED, async (event) => {
        const { field, value } = event.detail

        if (field === "colonyId") {
            const colonyInventory = await displayColonyInventory(value)
            document.querySelector(".colony__inventory").innerHTML = colonyInventory
        }

        if (field === "facilityId") {
            const facilityInventory = await displayFacilityInventory(value)
            document.querySelector(".facility__inventory").innerHTML = facilityInventory
        }

        if (field == "spaceCart") {
            const spaceCart = await updateSpaceCart()
            document.querySelector(".space__cart").innerHTML = spaceCart
        }
            
    })
}

export const ExomineDisplay = async () => {

    document.addEventListener('change', handleExomineListeners)
    
    const governorsHTML = await ChooseGovernor()
    const facilitiesHTML = await ChooseFacility()
    const facilityInventoryHTML = await displayFacilityInventory()
    const colonyInventoryHTML = await displayColonyInventory()
    const spaceCartHTML = await updateSpaceCart()
    const createPurchaseHTML = createPurchaseClick()
    
    return `
        <header class="header">
            <img src="./images/logo.png" class="logo" />
            <h1 class="title">Solar System Mining Marketplace</h1>
        </header>
    
        <div class="grid-container">
            <article class="choices">
                <section class="choices__governors options">
                    ${governorsHTML}
                </section>
        
                <section class="choices__facilities options">
                    ${facilitiesHTML}
                </section>
            </article>
            <article class="facility__inventory inventory">
                    ${facilityInventoryHTML}
            </article>
            <article class="colony__inventory inventory">
                    ${colonyInventoryHTML}
            </article>
            <article class="space__cart inventory">
                    ${spaceCartHTML}
            </article>
            <article class="purchase__minerals">
                    ${createPurchaseHTML}
            </article>
        </div>
    `
}