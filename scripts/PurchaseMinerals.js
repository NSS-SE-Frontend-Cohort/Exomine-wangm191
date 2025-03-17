import { purchaseMineral } from "./TransientState.js"

// Event handler for button click
export const handlePurchaseClick = (eventClick) => {
    if (eventClick.target && eventClick.target.id === 'purchase') {
        purchaseMineral();
    }
}

// Create button and add event listener
export const createPurchaseClick = () => {
    
    document.addEventListener('click', handlePurchaseClick);

    return "<article class='createPurchase'><button id='purchase'>Purchase Minerals</button></article>";
}
