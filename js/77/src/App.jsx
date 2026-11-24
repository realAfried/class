import { useState, useEffect, use } from 'react'
import Header from './Header'
import './App.css'
import Select from './Select'
import Input from './Input'
import { fetchJson } from './fetch'
import Converted from './Converted'
import NoConversion from './NoConversion'
import ErrorMessage from './ErrorMessage'
import Button from './Button'
import { formatMoney } from './formatMoney';
const URL = "https://api.frankfurter.dev/v1/currencies"

function App() {

  const [list, setList] = useState([]);

  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [exchange, setExchange] = useState(null);
  const [failedLoad, setFailedLoad] = useState(null);
  const [switchToAndFrom, setSwitchToAndFrom] = useState('right');
  // const [setTitle] = useState()

  useEffect(() => {
    if (exchange === null || amount <=0) {
      document.title = 'Pcs Currency';
    }
    else {
      const [[code, rate]] = Object.entries(exchange.rates);
      console.log(code, rate)
      document.title = `${formatMoney(amount, exchange.base)} = ${formatMoney(amount * rate, code)}`
      // `${amount} ${exchange.base} = ${(amount * rate).toFixed(2)} ${code}`
    }
  }, [exchange, amount])

  useEffect(() => {
    async function loadOptions() {
      try {
        const data = await fetchJson(URL);
        const dataArray = Object.entries(data);
        setList(dataArray)
        console.log(dataArray)
        setFailedLoad(null)
      } catch (e) {
        setFailedLoad(e.message)
      }
    }
    loadOptions()
  }, [])

  useEffect(() => {
    async function inputChanged() {

      if (to !== '' && from !== '' && to !== from) {
        try {
          const data = await fetchJson(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`);
          setFailedLoad(null)

          setExchange(data);
        } catch (e) {
          setFailedLoad(e.message)
        }
      }
    }
    inputChanged();
  }, [from, to])

  function switchingTheToAndFrom() {
    const direction = switchToAndFrom === "right" ? "left" : "right";
    setSwitchToAndFrom(direction)
    setFrom(to);
    setTo(from)
  }

  return (
    <>
      <Header />
      <div className='wrapper'>
        <Input value={amount} onChange={e => setAmount(e.target.value)} />
        <Select value={from} onChange={e => setFrom(e.target.value)} fromOrTo="From" options={list} />
        <Button kind={switchToAndFrom} onClick={switchingTheToAndFrom} />
        <Select value={to} onChange={e => setTo(e.target.value)} fromOrTo="To" options={list} />
        {!exchange && <NoConversion />}
        {exchange && <Converted exchange={exchange} amount={amount} />}
        {failedLoad && <ErrorMessage message={failedLoad} />}
      </div>
    </>
  )
}

export default App
