import NoWeather from "./NoWeather";
import Weather from "./Weather"
import { useState, useEffect } from "react"

// Reference version - not imported anywhere.

export default function DisplayExample() {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function loadWeather() {
            try {
                const API_KEY = 'API_KEY';
                const r = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?zip=08701&appid=${API_KEY}&units=imperial&lang=he`,
                    { signal: controller.signal }
                );

                const weatherData = await r.json();

                if (!r.ok) {
                    throw new Error(`${r.status} - ${r.statusText} - ${weatherData.message}`);
                }

                setWeather(weatherData);
            } catch (e) {
                // aborting on unmount is expected, not a real error
                if (e.name === 'AbortError') {
                    return;
                }
                console.error('oops', e);
                setError(e.message);
            }
        }

        loadWeather();

        // cleanup: runs when the component unmounts (and between StrictMode's double run)
        return () => controller.abort();
    }, []);

    if (error) {
        return <NoWeather />;
    }

    if (weather === null) {
        return <div>Loading...</div>;
    }

    return (
        <Weather
            name={weather.name}
            temp={weather.main.temp}
            description={weather.weather[0].description}
            src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
        />
    );
}
