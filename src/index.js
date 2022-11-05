import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

Notiflix.Notify.init({
  position: 'center-top',
  clickToClose: true,
});

const DEBOUNCE_DELAY = 300;

let getElem = selector => document.querySelector(selector);

getElem('#search-box').addEventListener(
  'input',
  debounce(onFieldInput, DEBOUNCE_DELAY)
);

function onFieldInput() {
  const inputCountryValue = getElem('#search-box').value.trim();
  if (!inputCountryValue) {
    getElem('.country-info').innerHTML = '';
    getElem('.country-list').innerHTML = '';
    return;
  }
  //console.log(`country Input + Trim: , +${inputCountryValue}+`);
  fetchCountries(inputCountryValue)
    .then(country => {
      if (country.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (country.length >= 2 && country.length < 10) {
        renderCountryList(country);
      } else if ((country.length = 1)) {
        renderCountryInfo(country);
      }
    })
    .catch(error => console.log('error', error));
}

// function fetchCountries(country) {
//   return fetch(
//     `${URL}${country}?fields=flags,name,capital,population,languages`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(
//         Notiflix.Notify.failure('Oops, there is no country with that name')
//       );
//     }
//     return response.json();
//   });
// }

//=====================================================================================

function renderCountryList(country) {
  const markup = country
    .map(countryItem => {
      return `
            <li class="list-item">
                <div class="flex">
                    <img class="country-flag" src="${countryItem.flags.png}" alt="">
                    <p class="country-name">${countryItem.name.official}</p>
                </div>    
            </li>
            `;
    })
    .join('');
  getElem('.country-info').innerHTML = '';
  getElem('.country-list').innerHTML = markup;
}

function renderCountryInfo(country) {
  //console.log('country', country)
  const markup = country
    .map(countryItem => {
      return `
               
                    <div class="flex">
                        <img class="country-flag" src="${countryItem.flags.png}" alt="">
                        <p class="country-name">${countryItem.name.official}</p>
                    </div>    
                  <p class="country-name"><b>Capital:</b>${countryItem.capital}</p>
                  <p class="country-name"><b>Population:</b>${countryItem.population}</p>
                  <p class="country-name"><b>Languages:</b>${countryItem.languages}</p>
               
            `;
    })
    .join('');
  getElem('.country-list').innerHTML = '';
  getElem('.country-info').innerHTML = markup;
}
