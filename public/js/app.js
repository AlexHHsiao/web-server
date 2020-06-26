const fetchWeather = (location) => {
    fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
        return response.json();
    }).then(({error, location, forecast}) => {
        if (error) {
            messageOne.textContent = error;
            messageTwo.textContent = '';
        } else {
           messageOne.textContent = location;
           messageTwo.textContent = forecast;
        }
    });
};

const weatherForm = document.querySelector('form');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = 'Loading...';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = event.target.location.value;
    fetchWeather(location);
});
