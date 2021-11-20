// selecting elements
// selecting entire html document
console.log(document.documentElement);
// head
console.log(document.head);
// body
console.log(document.body);

// the first element that matches
const header = document.querySelector('.header');

// selecting multiple elements
// returns node list
const allSEctions = document.querySelectorAll('.section');
console.log(allSEctions);

// id
document.getElementById('#section--3');

const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

document.getElementsByClassName('btn');

// Creating and Inserting elements
// insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');

// message.textContent =
//   'We use cookies for imporved functionality and analaytics';

message.innerHTML =
  'We use cookies for imporved functionality and analaytics. <button class="btn btn--close-cookie">Got it!</button>';

//insert it into DOM
header.prepend(message); //the first child of header
// header.append(message); // the last child of header

// insert the elemnt into multiple places
header.append(message.cloneNode(true));

// insert as sibling
// header.before(message)  // insert before the header element
// header.after(message) //after

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message)
  });

console.log(message);
