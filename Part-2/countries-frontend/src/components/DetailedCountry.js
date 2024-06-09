import { getValue } from "@testing-library/user-event/dist/utils"

const DetailedCountry = (prop) => {
    return (
        <div>
            <h1>{prop.name.common}</h1>
            <p>capital: {prop.capital}</p>
            <p>area: {prop.area}</p>
            <h2>languages</h2>
            <ul>
                {Object.entries(prop.languages).map(([key, value]) => (<li key={key}>{value}</li>))}
            </ul>
            <img src={prop.flags.svg} alt={prop.name.common} height="200"></img>
        </div>
    )
}

export default DetailedCountry