import { purchaseMineral } from "./TransientState.js"

export const handlePurchaseCLick = (eventClick) => {
    if (eventClick.target.id === 'purchase'){
        purchaseMineral()
    }
}

export const createPurchaseCLick = () => {

    document.addEventListener('click', handlePurchaseCLick)

    return "<article class='createPurchase'><button id='purchase'>Purchase Minerals</button></article>"
}