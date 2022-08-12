console.log('Client JS file loaded in browser!');


const fetchForecast = (address) => {
  fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });

}

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
  if (event.preventDefault) {
    event.preventDefault();
  }
  console.log(search.value);
  messageOne.textContent = 'Loading . . . ';
  messageTwo.textContent = '';
  fetchForecast(search.value);
});

