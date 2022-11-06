import './css/styles.css';
import { fetchCountries } from './fetchcountries';
import { renderCountryList, renderCountryInfo } from './rendercountres';
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
