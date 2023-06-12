const DOMAINURL = 'https://6484e2a6ee799e3216271c29.mockapi.io/api/v1/users';
let userId;

if (!localStorage.getItem('userId')) {
  createNewUser();
} else {
  userId = localStorage.getItem('userId');
}

function createNewUser() {
  userId = Math.floor(Math.random() * 99 + 1);
  localStorage.setItem('userId', userId);
}

async function fetchUserInfo(userId) {
  try {
    const response = await fetch(`${DOMAINURL}/${userId}`);
    const data = await response.json();
    fillUserInfo(data);
    stopLoader();
  } catch (error) {
    alert(error);
  }
}

function fillUserInfo(data) {
  const {
    name,
    country,
    city,
    street,
    phone,
    birthdate,
    image
  } = data;

  const DOMFields = findDOMContent();
  DOMFields.name.innerText = name;
  DOMFields.country.innerText = country;
  DOMFields.city.innerText = city;
  DOMFields.street.innerText = street;
  DOMFields.phone.innerText = phone;
  DOMFields.birthDate.innerText = birthdate;
  DOMFields.photo.src = image;
}

function stopLoader() {
  document.body.classList.add('loaded');
}

function findDOMContent() {
  const DOMFields = {
    name: document.querySelector('#name'),
    country: document.querySelector('#country'),
    city: document.querySelector('#city'),
    street: document.querySelector('#street'),
    phone: document.querySelector('#phone'),
    birthDate: document.querySelector('#birthDate'),
    photo: document.querySelector('#photo')
  };
  return DOMFields;
}

fetchUserInfo(userId);