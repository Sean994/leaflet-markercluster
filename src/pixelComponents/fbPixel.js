export const fbqViewContent = () => {
    window.fbq('track', 'Purchase')
}

export const fbqTaxiDataCall = (callTime) => {
    window.fbq('trackCustom', 'Taxi Data', {call: callTime})
}
