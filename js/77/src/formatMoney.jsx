export function formatMoney(amount, code) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: code
    }).format(amount);
}