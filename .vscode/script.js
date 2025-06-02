document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let currentSlideIndex = 0;

    function showSlide(index) {
        if (index >= 0 && index < slides.length) {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
            currentSlideIndex = index;
        }
    }

    function showMainPage() {
        document.getElementById('homePage').style.display = 'none';
        document.getElementById('mainPage').style.display = 'block';
        document.getElementById('headerTitle').textContent = 'Vital Monitor';
        document.getElementById('homeLink').style.display = 'none';
        document.getElementById('backLink').style.display = 'block';
        showSlide(0); 
    }

    function goBack() {
        document.getElementById('homePage').style.display = 'block';
        document.getElementById('mainPage').style.display = 'none';
        document.getElementById('headerTitle').textContent = 'Vital Monitor';
        document.getElementById('homeLink').style.display = 'block';
        document.getElementById('backLink').style.display = 'none';
    }

    function validateSlide1() {
        const age = document.getElementById('ageInput').value;
        const gender = document.getElementById('genderInput').value;

        document.getElementById('ageError').style.display = age ? 'none' : 'block';
        document.getElementById('genderError').style.display = gender ? 'none' : 'block';

        if (age && gender) {
            showSlide(1);
        }
    }

    function validateSlide2() {
        const heartRate = document.getElementById('heartRateInput').value;
        const bloodPressure = document.getElementById('bloodPressureInput').value;
        const validBP = /^\d{2,3}\/\d{2,3}$/.test(bloodPressure);

        document.getElementById('heartRateError').style.display = heartRate ? 'none' : 'block';
        document.getElementById('bloodPressureError').style.display = validBP ? 'none' : 'block';

        if (heartRate && validBP) {
            showSlide(2);
        }
    }

    function validateSlide3() {
        const temperature = document.getElementById('temperatureInput').value;
        const temperatureUnit = document.getElementById('temperatureUnit').value;

        document.getElementById('temperatureError').style.display = temperature ? 'none' : 'block';
        document.getElementById('temperatureUnitError').style.display = temperatureUnit ? 'none' : 'block';

        if (temperature && temperatureUnit) {
            showSlide(3);
        }
    }

    function checkHealth() {
        const heartRate = parseFloat(document.getElementById('heartRateInput').value);
        const bloodPressure = document.getElementById('bloodPressureInput').value;
        const temperature = parseFloat(document.getElementById('temperatureInput').value);
        const tempUnit = document.getElementById('temperatureUnit').value;
        const age = parseInt(document.getElementById('ageInput').value);
    
        console.log("Heart Rate:", heartRate);
        console.log("Blood Pressure:", bloodPressure);
        console.log("Temperature:", temperature, tempUnit);
        console.log("Age:", age);
    
        let alertMessage = "";
        let recommendedTests = [];
    
        const heartRateNormalRange = [60, 100];
        const tempRange = tempUnit === "Celsius" ? [35, 37] : [96, 99];
    
        if (heartRate < heartRateNormalRange[0] || heartRate > heartRateNormalRange[1]) {
            alertMessage += "Abnormal Heart Rate. ";
            recommendedTests.push("ECG", "Holter Monitor");
        }
    
        if (temperature < tempRange[0] || temperature > tempRange[1]) {
            alertMessage += temperature > tempRange[1] ? "High Fever. " : "Low Body Temperature. ";
            recommendedTests.push("Blood Tests", "Electrolyte Test");
        }
    
        console.log("Alert Message:", alertMessage);
        console.log("Recommended Tests:", recommendedTests);
    
        document.getElementById('alertMessage').textContent = alertMessage || "All metrics are normal!";
        document.getElementById('alertMessage').style.display = 'block';
    
        const testsList = document.getElementById('testsList');
        testsList.innerHTML = '';
        recommendedTests.forEach(test => {
            const li = document.createElement('li');
            li.textContent = test;
            testsList.appendChild(li);
        });
    
        document.querySelector('.tests').style.display = recommendedTests.length > 0 ? 'block' : 'none';
        showSlide(4);
    }
    

    function prevSlide(index) {
        showSlide(index);
    }

    window.showMainPage = showMainPage;
    window.goBack = goBack;
    window.validateSlide1 = validateSlide1;
    window.validateSlide2 = validateSlide2;
    window.validateSlide3 = validateSlide3;
    window.checkHealth = checkHealth;
    window.prevSlide = prevSlide;
});
