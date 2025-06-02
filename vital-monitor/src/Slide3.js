import React from 'react';

const Slide3 = ({ temperature, temperatureUnit, setTemperature, setTemperatureUnit, validateSlide3 }) => {
    return (
        <div className="slide">
            <h2>Enter Your Body Temperature</h2>
            <input type="text" value={temperature} onChange={(e) => setTemperature(e.target.value)} placeholder="Body Temperature" />
            <select value={temperatureUnit} onChange={(e) => setTemperatureUnit(e.target.value)}>
                <option value="Celsius">Celsius</option>
                <option value="Fahrenheit">Fahrenheit</option>
            </select>
            <button onClick={validateSlide3}>Next</button>
        </div>
    );
};

export default Slide3;
