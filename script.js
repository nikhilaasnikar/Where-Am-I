'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} M people</p>
        <p class="country__row"><span><img src="https://img.icons8.com/ios-filled/48/000000/talk-male.png" height=20px/></span>${
          data.languages[0].name
        }</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        <p class="country__row"><span><img src="https://img.icons8.com/color/48/000000/city-buildings.png" height=20px/></span>${
          data.capital
        }</p>
        <p class="country__row"><span><img src="https://img.icons8.com/ios-filled/48/000000/phone-not-being-used.png" height=20px/></span>${
          data.callingCodes
        }</p>
      </div>
    </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);

  //   countriesContainer.style.opacity = 1;
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //   countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest(); //Old school way

//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);

//   request.send();

//   request.addEventListener('load', function () {
//     console.log(this.responseText);

//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//   <article class="country">
//   <img class="country__img" src="${data.flag}" />
//   <div class="country__data">
//     <h3 class="country__name">${data.name}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       +data.population / 1000000
//     ).toFixed(1)} M people</p>
//     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//     <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//   </div>
// </article>`;

//     countriesContainer.insertAdjacentHTML('beforeend', html);

//     countriesContainer.style.opacity = 1;
//   });
// };
// getCountryData('ireland');
// getCountryData('republic of india');
// getCountryData('pakistan');

// const getCountryandNeighbour = function (country) {
//   //   AJAX CALL
//   const request = new XMLHttpRequest(); //Old school way

//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);

//   request.send();

//   request.addEventListener('load', function () {
//     console.log(this.responseText);

//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     renderCountry(data);

//     //  Get neighbour country

//     const [neighbour] = data.borders;
//     if (!neighbour) return;

//     const request2 = new XMLHttpRequest(); //Old school way

//     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);

//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };
// getCountryandNeighbour('ireland');
// getCountryandNeighbour('republic of india');
// getCountryandNeighbour('pakistan');

// setTimeout(() => {
//   console.log(`1 second passed`);
//   setTimeout(() => {
//     console.log(`2 second passed`);
//     setTimeout(() => {
//       console.log(`3 second passed`);
//     }, 1000);
//   }, 1000);
// }, 1000);

// const request3 = fetch('https://restcountries.eu/rest/v2/name/ireland');

const getJSON = function (url, errorMSg = 'Something Went Wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMSg}(${response.status})`);

    return response.json();
  });
};
// const getCountryData = function (country) {
//   // Country 1

//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     // .then(function (response) {
//     //   return response.json();
//     // })
//     // .then(function (data) {
//     //   renderCountry(data[0]);
//     // });
//     .then(response => {
//       console.log(response);
//       if (!response.ok)
//         throw new Error(`Country not found(${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;
//       // Country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err}`);
//       renderError(`Somthing went wrong ${err.message}. Try again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// btn.addEventListener('click', function () {
//   getCountryData('ireland');
// });

const getCountryData = function (country) {
  // Country 1
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found'
  )
    .then(data => {
      console.log(data);
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error('No neighbour Found!!!');
      // Country 2
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        'Country Not Found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}`);
      renderError(`Somthing went wrong ${err.message}. Try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener('click', function () {});

getCountryData(prompt('Please enter your country'));
