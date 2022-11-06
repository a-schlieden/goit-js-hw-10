let getElem = selector => document.querySelector(selector);

export function renderCountryList(country) {
  const markup = country
    .map(countryItem => {
      const { flags, name } = countryItem;
      return `
            <li class="list-item">
                <div class="flex">
                    <img class="country-flag" src="${flags.png}" alt="">
                    <p class="country-name">${name.official}</p>
                </div>    
            </li>
            `;
    })
    .join('');
  getElem('.country-info').innerHTML = '';
  getElem('.country-list').innerHTML = markup;
}

export function renderCountryInfo(country) {
  const markup = country
    .map(countryItem => {
      const { flags, name, capital, population, languages } = countryItem;
      return `   
              <div class="flex">
                <img class="country-flag" src="${flags.png}" alt="">
                <p class="country-name">${name.official}</p>
              </div>    
              <p class="country-name"><b>Capital: </b>${capital}</p>
              <p class="country-name"><b>Population: </b>${population}</p>
              <p class="country-name"><b>Languages: </b>${Object.values(
                languages
              )}</p>  
            `;
    })
    .join('');
  getElem('.country-list').innerHTML = '';
  getElem('.country-info').innerHTML = markup;
}
