export const fbqViewContent = () => {
    fbq('track', 'Purchase')
}

export const fbqTaxiDataCall = (callTime) => {
    fbq('trackCustom', 'Taxi Data', {call: callTime})
}
