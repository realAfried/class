
export default function Weather(props) {
    return (
        <>
            <div className="weather">The weather in <span >{props.name}</span></div>
            <img id="icon" src={props.src}  className="weather" />
            <div className="weather"><span >{props.temp}</span> and <span >{props.description}</span></div>
        </>
    )
}
