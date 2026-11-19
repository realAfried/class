import React from 'react'

export default function Converted({exchange, amount}) {
    const date = new Date(exchange.date).toLocaleDateString('en-US');
    const [[code, rate]] = Object.entries(exchange.rates);

    return (
        <>
            <div>{amount} {exchange.base} = {(amount * rate).toFixed(2)} {code}</div>
            <div>1 {exchange.base} = {rate} {code}</div>
            <div>Rate as of {date}</div>
        </>
    )
}


/* the converted amount to 2 decimal places, e.g. "100 USD = 326.39 ILS"
the rate, e.g. "1 USD = 3.2639 ILS"
"rates as of" the date the API return */