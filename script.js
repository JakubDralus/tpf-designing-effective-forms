
let clickCount = 0;

const countryInput = document.getElementById('country');
const myForm = document.getElementById('form');
const modal = document.getElementById('form-feedback-modal');
const clicksInfo = document.getElementById('click-count');

async function fetchAndFillCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        const data = await response.json();
        const countries = data.map(country => country.name.common);
        countryInput.innerHTML = countries
          .map(country => `<option value="${country}">${country}</option>`)
          .join('');
        
        getCountryByIP();
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}

function getCountryByIP() {
    fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(response => response.json())
        .then(data => {
            const country = data.country;
            console.log(country);
            const select = document.getElementById('country');
            const option = [...select.options].find(option => option.value === country);
            if (option) {
                option.selected = true;
            }

            getCountryCode(country);
        })
        .catch(error => {
            console.error('Błąd pobierania danych z serwera GeoJS:', error);
        });
}

function getCountryCode(countryName) {
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        return response.json();
    })
    .then(data => {
        const countryCode = data[0].idd.root + data[0].idd.suffixes.join("")
        const select = document.getElementById('countryCode');
        const option = [...select.options].find(option => option.value === countryCode);
        if (option) {
            option.selected = true;
        }
        // console.log(countryCode);
    })
    .catch(error => {
        console.error('Wystąpił błąd:', error);
    });
}

function submitForm(event) {
    event.preventDefault(); // dont refresh website
    const form = document.getElementById("form")
    
    if (form.checkValidity() === false) {
        // return;
    }
    
    let formData = new FormData(form);
    let jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });
    console.log(jsonData);
}

function handleClick() {
    clickCount++;
    clicksInfo.innerText = clickCount;
}

(() => {
    fetchAndFillCountries();
    document.addEventListener('click', handleClick);
    document.getElementById("form").addEventListener("submit", submitForm);
})()
