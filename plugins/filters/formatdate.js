import Vue from 'vue';

Vue.filter('formatDate', ({ currency, value }) => {
    if (typeof value !== "number") {
        return value;
    }
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(value);
});