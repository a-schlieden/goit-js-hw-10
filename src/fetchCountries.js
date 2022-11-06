import Notiflix from 'notiflix';

export function fetchCountries(country) {
  const URL = 'https://restcountries.com/v3.1/name/';
  return fetch(
    `${URL}${country}?fields=flags,name,capital,population,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
    }
    return response.json();
  });
}
