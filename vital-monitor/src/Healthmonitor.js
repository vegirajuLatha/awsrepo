import React, { useState } from 'react';
import './App.css';

const HealthMonitor = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    heartRate: '',
    bloodPressure: '',
    temperature: '',
    temperatureUnit: 'Celsius'
  });
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const [recommendedTests, setRecommendedTests] = useState([]);

  const validateFields = (fields) => {
    let slideErrors = {};
    fields.forEach((field) => {
      if (!formData[field]) {
        slideErrors[field] = `${field} is required`;
      }
    });
    return slideErrors;
  };

  const validateSlide1 = () => {
    const slideErrors = validateFields(['age', 'gender']);
    setErrors(slideErrors);

    if (Object.keys(slideErrors).length === 0) {
      setAlertMessage('');
      setCurrentSlide(2);
    } else {
      setAlertMessage('Please fill in all required fields.');
    }
  };

  const validateSlide2 = () => {
    const slideErrors = validateFields(['heartRate', 'bloodPressure']);
    setErrors(slideErrors);

    if (Object.keys(slideErrors).length === 0) {
      setAlertMessage('');
      setCurrentSlide(3);
    } else {
      setAlertMessage('Please fill in all required fields.');
    }
  };

  const checkHealthAndRecommendTests = () => {
    const slideErrors = validateFields(['temperature']);
    setErrors(slideErrors);

    if (Object.keys(slideErrors).length === 0) {
      let newAlertMessage = '';
      let newRecommendedTests = [];

      // Heart rate validation
      const heartRate = parseInt(formData.heartRate, 10);
      if (isNaN(heartRate) || heartRate < 60 || heartRate > 100) {
        newAlertMessage += 'Abnormal heart rate detected. ';
        newRecommendedTests.push('Electrocardiogram (ECG)', 'Holter Monitor');
      }

      // Blood pressure validation
      const [systolic, diastolic] = formData.bloodPressure.split('/').map(Number);
      if (isNaN(systolic) || isNaN(diastolic)) {
        newAlertMessage += 'Invalid blood pressure format. ';
        newRecommendedTests.push('Ambulatory Blood Pressure Monitoring (ABPM)', 'Electrocardiogram (ECG)');
      } else {
        const age = parseInt(formData.age, 10);
        if (age >= 18 && age <= 39) {
          if (systolic > 119 || diastolic > 70) {
            newAlertMessage += 'High blood pressure detected. ';
            newRecommendedTests.push('Ambulatory Blood Pressure Monitoring (ABPM)', 'Electrocardiogram (ECG)');
          } else if (systolic < 90 || diastolic < 60) {
            newAlertMessage += 'Low blood pressure detected. ';
            newRecommendedTests.push('Blood Tests', 'Tilt Table Test');
          }
        } else if (age >= 40 && age <= 59) {
          if (systolic > 124 || diastolic > 77) {
            newAlertMessage += 'High blood pressure detected. ';
            newRecommendedTests.push('Ambulatory Blood Pressure Monitoring (ABPM)', 'Electrocardiogram (ECG)');
          } else if (systolic < 90 || diastolic < 60) {
            newAlertMessage += 'Low blood pressure detected. ';
            newRecommendedTests.push('Blood Tests', 'Tilt Table Test');
          }
        } else if (age >= 60) {
          if (systolic > 133 || diastolic > 69) {
            newAlertMessage += 'High blood pressure detected. ';
            newRecommendedTests.push('Ambulatory Blood Pressure Monitoring (ABPM)', 'Electrocardiogram (ECG)');
          } else if (systolic < 90 || diastolic < 60) {
            newAlertMessage += 'Low blood pressure detected. ';
            newRecommendedTests.push('Blood Tests', 'Tilt Table Test');
          }
        }
      }

      // Temperature validation
      const temperature = parseFloat(formData.temperature);
      const unit = formData.temperatureUnit;
      if (isNaN(temperature)) {
        newAlertMessage += 'Invalid temperature value. ';
      } else {
        if (unit === 'Celsius') {
          if (temperature > 37.5) {
            newAlertMessage += 'High body temperature detected. ';
            newRecommendedTests.push('Blood Tests', 'Chest X-ray');
          } else if (temperature < 35) {
            newAlertMessage += 'Low body temperature detected. ';
            newRecommendedTests.push('Blood Tests', 'Electrolyte Tests');
          }
        } else if (unit === 'Fahrenheit') {
          if (temperature > 99.5) {
            newAlertMessage += 'High body temperature detected. ';
            newRecommendedTests.push('Blood Tests', 'Chest X-ray');
          } else if (temperature < 95) {
            newAlertMessage += 'Low body temperature detected. ';
            newRecommendedTests.push('Blood Tests', 'Electrolyte Tests');
          }
        }
      }

      if (!newAlertMessage) {
        newAlertMessage = 'All vital signs are within normal ranges. You are healthy!';
      }

      setAlertMessage(newAlertMessage);
      setRecommendedTests(newRecommendedTests);
      setCurrentSlide(4); // Show results slide
    } else {
      setAlertMessage('Please fill in all required fields.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  return (
    <div>
      <header>
        <h1>Vital Monitor</h1>
        {currentSlide !== 0 && (
          <button onClick={() => setCurrentSlide(0)} className="home-button">Home</button>
        )}
      </header>

      <div className="container">
        {currentSlide === 0 && (
          <div className="slide active">
            <h2>Welcome to the Vital Monitor</h2>
            <p>This tool helps you monitor and evaluate your vital signs.</p>
            <button onClick={() => setCurrentSlide(1)}>Start Monitoring</button>
          </div>
        )}

        {currentSlide === 1 && (
          <div className="slide active">
            <h2>Step 1: Enter Your Age and Gender</h2>
            <input
              type="number"
              name="age"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleInputChange}
              className={errors.age ? 'error' : ''}
            />
            {errors.age && <p className="alert-message error">{errors.age}</p>}
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className={errors.gender ? 'error' : ''}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p className="alert-message error">{errors.gender}</p>}
            <button onClick={validateSlide1}>Next</button>
          </div>
        )}

        {currentSlide === 2 && (
          <div className="slide active">
            <h2>Step 2: Enter Heart Rate and Blood Pressure</h2>
            <input
              type="number"
              name="heartRate"
              placeholder="Enter your heart rate"
              value={formData.heartRate}
              onChange={handleInputChange}
              className={errors.heartRate ? 'error' : ''}
            />
            {errors.heartRate && <p className="alert-message error">{errors.heartRate}</p>}
            <input
              type="text"
              name="bloodPressure"
              placeholder="Enter your blood pressure (e.g., 120/80)"
              value={formData.bloodPressure}
              onChange={handleInputChange}
              className={errors.bloodPressure ? 'error' : ''}
            />
            {errors.bloodPressure && <p className="alert-message error">{errors.bloodPressure}</p>}
            <button onClick={validateSlide2}>Next</button>
            <button onClick={() => setCurrentSlide(1)} className="prev-button">Back</button>
          </div>
        )}

        {currentSlide === 3 && (
          <div className="slide active">
            <h2>Step 3: Enter Your Body Temperature</h2>
            <input
              type="number"
              name="temperature"
              placeholder="Enter your temperature"
              value={formData.temperature}
              onChange={handleInputChange}
              className={errors.temperature ? 'error' : ''}
            />
            {errors.temperature && <p className="alert-message error">{errors.temperature}</p>}
            <select
              name="temperatureUnit"
              value={formData.temperatureUnit}
              onChange={handleInputChange}
            >
              <option value="Celsius">Celsius</option>
              <option value="Fahrenheit">Fahrenheit</option>
            </select>
            <button onClick={checkHealthAndRecommendTests}>Check Health</button>
            <button onClick={() => setCurrentSlide(2)} className="prev-button">Back</button>
          </div>
        )}

        {currentSlide === 4 && (
          <div className="slide active">
            <h2>Your Health Results</h2>
            <p className={alertMessage.includes('healthy') ? 'good' : 'alert-message'}>{alertMessage}</p>
            {recommendedTests.length > 0 && (
              <div>
                <h3>Recommended Tests</h3>
                <ul>
                  {recommendedTests.map((test, index) => (
                    <li key={index} className="test-item">{test}</li>
                  ))}
                </ul>
              </div>
            )}
            <button onClick={() => setCurrentSlide(3)} className="prev-button">Back</button>
          </div>
        )}
      </div>

      <footer>
        <p>Vital Monitor &copy; 2024</p>
      </footer>
    </div>
  );
};

export default HealthMonitor;
