import { ExomineDisplay } from "./ExomineDisplay.js"

const mainContainer = document.querySelector("#container")

const renderAllHTML = async () => {


    mainContainer.innerHTML = await ExomineDisplay()
}

document.addEventListener("purchasedMinerals", event => {
    console.log("Purchased Minerals ... Regenerating HTML...")
    renderAllHTML()
} )

renderAllHTML()