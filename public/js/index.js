import { login } from './login';
import '@babel/polyfill';
import { displayMap } from './mapbox';
const mapbox = document.getElementById('map');
if (mapbox) {
  const locations = JSON.parse(mapbox).dataset.locations;
  displayMap(locations);
}
const form = document.querySelector('.form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
