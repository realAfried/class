import NoWeather from "./NoWeather";
import Weather from "./Weather"
import { useState, useEffect } from "react"

export default function Display() {
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const API_KEY = 'API_KEY';
                const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=08701&appid=${API_KEY}&units=imperial&lang=he`);

                const weatherData = await r.json();


                if (!r.ok) {
                    throw new Error(`${r.status} - ${r.statusText} - ${weatherData.message}`);
                }
                setWeather(weatherData);
                console.log(weatherData);
            } catch (e) {
                console.error('oops', e);
            }
        })()
    }, [])

    if (weather.length === 0) {
        return (
            // <NoWeather />
            <div/>
        )
    }

    return (
        <Weather name={weather.name} temp={weather.main.temp} description={weather.weather[0].description}
            src ={ `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}></Weather>
    )
}

