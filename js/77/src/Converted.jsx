import React from 'react'
import { formatMoney } from './formatMoney';

export default function Converted({ exchange, amount }) {
    const date = new Date(exchange.date).toLocaleDateString('en-US');
    const [[code, rate]] = Object.entries(exchange.rates);
    let createString;
    

    if (amount <= 0) {
        createString = "Please enter a positive amount";
    } else {
        createString = `${formatMoney(amount, exchange.base)} = ${formatMoney(amount * rate, code)}`
    }

    return (
        <>
            <div>{createString}</div>
            <div>{formatMoney(1, exchange.base)} = {formatMoney(rate, code)}</div>
            <div>Rate as of {date}</div>
        </>
    )
}


/* the converted amount to 2 decimal places, e.g. "100 USD = 326.39 ILS"
the rate, e.g. "1 USD = 3.2639 ILS"
"rates as of" the date the API return */