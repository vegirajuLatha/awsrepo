import React from 'react';

const Slide1 = ({ age, gender, setAge, setGender, validateSlide1 }) => {
    return (
        <div className="slide">
            <h2>Enter Your Age and Gender</h2>
            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter your age" />
            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Enter your gender" />
            <button onClick={validateSlide1}>Next</button>
        </div>
    );
};

export default Slide1;
