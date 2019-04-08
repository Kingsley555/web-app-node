
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

// messageOne.textContent = 'hello';


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;


    messageOne.style.background = 'green'
   messageTwo.style.background = 'green'

  messageOne.textContent = 'Loading....';
  messageTwo.textContent = '';

  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
     if (data.error){
         messageOne.textContent = (data.error);
         messageOne.style.background = 'red'
     } else {

        messageOne.textContent = (data.location)
        messageTwo.textContent = (data.forecast)
        messageOne.style.background = 'green'
        //  console.log(data.location)
        //  console.log(data.forecast)

     }
    })
})
});