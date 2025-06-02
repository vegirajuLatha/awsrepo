import React from 'react';

const Slide2 = ({ heartRate, bloodPressure, setHeartRate, setBloodPressure, validateSlide2 }) => {
    return (
        <div className="slide">
            <h2>Enter Your Heart Rate and Blood Pressure</h2>
            <input type="text" value={heartRate} onChange={(e) => setHeartRate(e.target.value)} placeholder="Heart Rate (bpm)" />
            <input type="text" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} placeholder="Blood Pressure (e.g., 120/80)" />
            <button onClick={validateSlide2}>Next</button>
        </div>
    );
};

export default Slide2;
